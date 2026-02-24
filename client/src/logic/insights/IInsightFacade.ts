// IInsightFacade.ts
import { getSessions } from "../../../shared/session";
import type { StudySession } from "../../../shared/session";

/**
 * Result types
 */
export type TimeBySubject = {
  subjectId: string | undefined;
  totalMs: number;
  sessions: number;
};

export type SimpleTotal = {
  totalMs: number;
  sessions: number;
};

export type DayBucket = {
  date: string; // YYYY-MM-DD (local)
  totalMs: number;
  sessions: number;
  bySubject: TimeBySubject[];
};

export type WeekdayAggregate = {
  weekday: number;
  totalMs: number;
  averageMs: number;
  daysCounted: number;
};

export type SubjectDetail = {
  subjectId: string | undefined;
  totalMs: number;
  sessions: number;
  daily: DayBucket[];
};

export interface IDefaultQueries {
  timeDoneInRange(startIso?: string, endIso?: string): Promise<SimpleTotal & { bySubject: TimeBySubject[] }>;

  timeDoneToday(refDate?: Date): Promise<SimpleTotal & { bySubject: TimeBySubject[] }>;

  weeklyBreakdown(weekStartIso?: string): Promise<{ weekStart: string; days: DayBucket[]; weekTotal: number; weekSessions: number }>;

  averageByWeekday(startIso?: string, endIso?: string): Promise<WeekdayAggregate[]>;

  subjectThisWeek(subjectId?: string, weekStartIso?: string): Promise<SubjectDetail>;

  topSubjects(n?: number, startIso?: string, endIso?: string): Promise<TimeBySubject[]>;
}

/* Implementation */
export class DefaultQueries implements IDefaultQueries {
  // Helpers

  private static toLocalYMD(d: Date) {
    const year = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  private static startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  private static endOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }

  private static parseIsoOrUndefined(iso?: string) {
    if (!iso) return undefined;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return undefined;
    return d;
  }

  /** Resolve a session's start timestamp (supports startTime | startedAt) */
  private static sessionStartMs(s: StudySession): number {
    const v = (s as any).startTime ?? (s as any).startedAt ?? (s as any).startedAtIso ?? (s as any).start;
    if (!v) return NaN;
    const t = new Date(v).getTime();
    return Number.isNaN(t) ? NaN : t;
  }

  /** Resolve a session's end timestamp (supports endTime | endedAt) */
  private static sessionEndMs(s: StudySession): number {
    const v = (s as any).endTime ?? (s as any).endedAt ?? (s as any).endedAtIso ?? (s as any).end;
    if (!v) return NaN;
    const t = new Date(v).getTime();
    return Number.isNaN(t) ? NaN : t;
  }

  /**
   * Whether session falls (partially) within [start, end).
   * Uses session start/end fallbacks.
   */
  private static sessionInRangeWithWindow(s: StudySession, start?: Date, end?: Date) {
    const stMs = DefaultQueries.sessionStartMs(s);
    const enMs = DefaultQueries.sessionEndMs(s);

    if (Number.isNaN(stMs) || Number.isNaN(enMs)) return false;
    if (start && enMs < start.getTime()) return false;
    if (end && stMs >= end.getTime()) return false;
    return true;
  }

  // Always fetch sessions here (no param expected)
  private async ensureSessions() {
    const all = await getSessions();
    return all ?? [];
  }

  /**
   * Calculate actual work milliseconds for a single session by simulating
   * alternating work/break blocks starting at the session start time.
   *
   * Session fields supported:
   * - workBlockMs OR workMs
   * - breakMs OR breakBlockMs
   * - startTime OR startedAt
   * - endTime OR endedAt
   *
   * Behavior:
   * - start with a work block, alternate with break blocks
   * - sum only the portions that fall inside [start, end)
   * - if break length <= 0: treat session as continuous work (everything between start and end is work)
   *
   * Uses timestamps as authoritative window. Partial blocks supported.
   */
  private static sessionWorkMs(s: StudySession) {
    if (!s.intendedCycles) {
      return 0;
    }

    else return s.workBlockMs * s.intendedCycles;
  }

  private static sumWorkMs(list: StudySession[]) {
    if (!Array.isArray(list) || list.length === 0) return 0;
    return list.reduce((acc, s) => acc + DefaultQueries.sessionWorkMs(s), 0);
  }

  private static bucketByDate(sessions: StudySession[]): Map<string, StudySession[]> {
    const m = new Map<string, StudySession[]>();
    for (const s of sessions) {
      const stMs = DefaultQueries.sessionStartMs(s);
      const d = Number.isNaN(stMs) ? DefaultQueries.toLocalYMD(new Date()) : DefaultQueries.toLocalYMD(new Date(stMs));
      const arr = m.get(d) ?? [];
      arr.push(s);
      m.set(d, arr);
    }
    return m;
  }

  private static groupBySubject(sessions: StudySession[]) {
    const m = new Map<string | undefined, StudySession[]>();
    for (const s of sessions) {
      const key = s.subjectId;
      const arr = m.get(key) ?? [];
      arr.push(s);
      m.set(key, arr);
    }
    return m;
  }

  /* ---------------- public API ---------------- */

  async timeDoneInRange(startIso?: string, endIso?: string) {
    const sess = await this.ensureSessions();
    const start = DefaultQueries.parseIsoOrUndefined(startIso);
    const end = DefaultQueries.parseIsoOrUndefined(endIso);
    const filtered = sess.filter((s) => DefaultQueries.sessionInRangeWithWindow(s, start, end));
    const totalMs = DefaultQueries.sumWorkMs(filtered);
    const subjectMap = DefaultQueries.groupBySubject(filtered);
    const bySubject: TimeBySubject[] = Array.from(subjectMap.entries()).map(([subjectId, arr]) => ({
      subjectId,
      totalMs: DefaultQueries.sumWorkMs(arr),
      sessions: arr.length,
    }));
    bySubject.sort((a, b) => b.totalMs - a.totalMs);
    return { totalMs, sessions: filtered.length, bySubject };
  }

  async timeDoneToday(refDate?: Date) {
    const now = refDate ?? new Date();
    const start = DefaultQueries.startOfDay(now);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    return this.timeDoneInRange(start.toISOString(), end.toISOString());
  }

  async weeklyBreakdown(weekStartIso?: string) {
    const sess = await this.ensureSessions();

    let weekStartDate: Date;
    if (weekStartIso) {
      const parsed = new Date(weekStartIso);
      if (Number.isNaN(parsed.getTime())) weekStartDate = DefaultQueries.startOfDay(new Date());
      else weekStartDate = DefaultQueries.startOfDay(parsed);
    } else {
      const now = new Date();
      const sunday = new Date(now);
      sunday.setDate(now.getDate() - now.getDay());
      weekStartDate = DefaultQueries.startOfDay(sunday);
    }

    const days: DayBucket[] = [];
    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(weekStartDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      const daySessions = sess.filter((s) => DefaultQueries.sessionInRangeWithWindow(s, dayStart, dayEnd));
      const subjectMap = DefaultQueries.groupBySubject(daySessions);
      const bySubject: TimeBySubject[] = Array.from(subjectMap.entries()).map(([subjectId, arr]) => ({
        subjectId,
        totalMs: DefaultQueries.sumWorkMs(arr),
        sessions: arr.length,
      }));
      bySubject.sort((a, b) => b.totalMs - a.totalMs);
      days.push({
        date: DefaultQueries.toLocalYMD(dayStart),
        totalMs: DefaultQueries.sumWorkMs(daySessions),
        sessions: daySessions.length,
        bySubject,
      });
    }

    const weekTotal = days.reduce((acc, d) => acc + d.totalMs, 0);
    const weekSessions = days.reduce((acc, d) => acc + d.sessions, 0);

    return { weekStart: DefaultQueries.toLocalYMD(weekStartDate), days, weekTotal, weekSessions };
  }

  async averageByWeekday(startIso?: string, endIso?: string) {
    const sess = await this.ensureSessions();
    const start = DefaultQueries.parseIsoOrUndefined(startIso);
    const end = DefaultQueries.parseIsoOrUndefined(endIso);
    const filtered = sess.filter((s) => DefaultQueries.sessionInRangeWithWindow(s, start, end));
    const weekdayToDateTotals = new Map<number, Map<string, number>>();

    for (const s of filtered) {
      const dMs = DefaultQueries.sessionStartMs(s);
      const d = Number.isNaN(dMs) ? new Date((s as any).startTime ?? (s as any).startedAt) : new Date(dMs);
      const ymd = DefaultQueries.toLocalYMD(d);
      const wd = d.getDay();
      const dateMap = weekdayToDateTotals.get(wd) ?? new Map<string, number>();
      dateMap.set(ymd, (dateMap.get(ymd) ?? 0) + DefaultQueries.sessionWorkMs(s));
      weekdayToDateTotals.set(wd, dateMap);
    }

    const aggregates: WeekdayAggregate[] = [];
    for (let wd = 0; wd < 7; wd++) {
      const dateMap = weekdayToDateTotals.get(wd) ?? new Map<string, number>();
      const daysCounted = dateMap.size;
      const totalMs = Array.from(dateMap.values()).reduce((a, b) => a + b, 0);
      const averageMs = daysCounted > 0 ? Math.round(totalMs / daysCounted) : 0;
      aggregates.push({ weekday: wd, totalMs, averageMs, daysCounted });
    }
    return aggregates;
  }

  async subjectThisWeek(subjectId?: string, weekStartIso?: string) {
    const week = await this.weeklyBreakdown(weekStartIso);
    const daily = week.days.map((d) => {
      const subjectSessions = d.bySubject.filter((b) => b.subjectId === subjectId);
      const totalMs = subjectSessions.reduce((acc, b) => acc + b.totalMs, 0);
      const sessionsCount = subjectSessions.reduce((acc, b) => acc + b.sessions, 0);
      return {
        date: d.date,
        totalMs,
        sessions: sessionsCount,
        bySubject: subjectSessions,
      } as DayBucket;
    });

    const totalMs = daily.reduce((a, b) => a + b.totalMs, 0);
    const sessionsCount = daily.reduce((a, b) => a + b.sessions, 0);

    return { subjectId, totalMs, sessions: sessionsCount, daily };
  }

  async topSubjects(n = 5, startIso?: string, endIso?: string) {
    const sess = await this.ensureSessions();
    const start = DefaultQueries.parseIsoOrUndefined(startIso);
    const end = DefaultQueries.parseIsoOrUndefined(endIso);
    const filtered = sess.filter((s) => DefaultQueries.sessionInRangeWithWindow(s, start, end));
    const subjectMap = DefaultQueries.groupBySubject(filtered);
    const arr: TimeBySubject[] = Array.from(subjectMap.entries()).map(([subjectId, arr]) => ({
      subjectId,
      totalMs: DefaultQueries.sumWorkMs(arr),
      sessions: arr.length,
    }));
    arr.sort((a, b) => b.totalMs - a.totalMs);
    return arr.slice(0, n);
  }
}

export default new DefaultQueries();