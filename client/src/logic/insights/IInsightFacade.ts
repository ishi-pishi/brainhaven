import type { StudySession } from "../storage/session";

/**
 *  This file is AI-GENERATED right now, since it's basically just boilerplate.
 */

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
  timeDoneInRange(
    sessions: StudySession[],
    startIso?: string,
    endIso?: string
  ): SimpleTotal & { bySubject: TimeBySubject[] };

  timeDoneToday(sessions: StudySession[], refDate?: Date): SimpleTotal & { bySubject: TimeBySubject[] };

  weeklyBreakdown(
    sessions: StudySession[],
    weekStartIso?: string
  ): { weekStart: string; days: DayBucket[]; weekTotal: number; weekSessions: number };

  averageByWeekday(
    sessions: StudySession[],
    startIso?: string,
    endIso?: string
  ): WeekdayAggregate[];

  subjectThisWeek(
    sessions: StudySession[],
    subjectId: string,
    weekStartIso?: string
  ): SubjectDetail;

  topSubjects(
    sessions: StudySession[],
    n?: number,
    startIso?: string,
    endIso?: string
  ): TimeBySubject[];
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

  private static sessionInRange(s: StudySession, start?: Date, end?: Date) {
    const st = new Date(s.startTime);
    const en = new Date(s.endTime);
    if (start && en < start) return false;
    if (end && st >= end) return false;
    return true;
  }

  private static sumWorkMs(list: StudySession[]) {
    return list.reduce((acc, s) => acc + (typeof s.workBlockMs === "number" ? s.workBlockMs : 0), 0);
  }

  private static bucketByDate(sessions: StudySession[]): Map<string, StudySession[]> {
    const m = new Map<string, StudySession[]>();
    for (const s of sessions) {
      const d = DefaultQueries.toLocalYMD(new Date(s.startTime));
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

  timeDoneInRange(sessions: StudySession[], startIso?: string, endIso?: string) {
    const start = DefaultQueries.parseIsoOrUndefined(startIso);
    const end = DefaultQueries.parseIsoOrUndefined(endIso);
    const filtered = sessions.filter((s) => DefaultQueries.sessionInRange(s, start, end));
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

  timeDoneToday(sessions: StudySession[], refDate?: Date) {
    const now = refDate ?? new Date();
    const start = DefaultQueries.startOfDay(now);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    return this.timeDoneInRange(sessions, start.toISOString(), end.toISOString());
  }

  weeklyBreakdown(sessions: StudySession[], weekStartIso?: string) {
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
      const daySessions = sessions.filter((s) => DefaultQueries.sessionInRange(s, dayStart, dayEnd));
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

  averageByWeekday(sessions: StudySession[], startIso?: string, endIso?: string) {
    const start = DefaultQueries.parseIsoOrUndefined(startIso);
    const end = DefaultQueries.parseIsoOrUndefined(endIso);
    const filtered = sessions.filter((s) => DefaultQueries.sessionInRange(s, start, end));
    const weekdayToDateTotals = new Map<number, Map<string, number>>();

    for (const s of filtered) {
      const d = new Date(s.startTime);
      const ymd = DefaultQueries.toLocalYMD(d);
      const wd = d.getDay();
      const dateMap = weekdayToDateTotals.get(wd) ?? new Map<string, number>();
      dateMap.set(ymd, (dateMap.get(ymd) ?? 0) + (typeof s.workBlockMs === "number" ? s.workBlockMs : 0));
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

  subjectThisWeek(sessions: StudySession[], subjectId: string, weekStartIso?: string) {
    const week = this.weeklyBreakdown(sessions, weekStartIso);
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

  topSubjects(sessions: StudySession[], n = 5, startIso?: string, endIso?: string) {
    const start = DefaultQueries.parseIsoOrUndefined(startIso);
    const end = DefaultQueries.parseIsoOrUndefined(endIso);
    const filtered = sessions.filter((s) => DefaultQueries.sessionInRange(s, start, end));
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