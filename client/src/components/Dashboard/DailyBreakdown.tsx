// src/components/insights/Charts.tsx
import React, { useEffect, useMemo, useState } from "react";
import type { StudySession } from "../../storage/session";
import DefaultQueries from "@/logic/insights/IInsightFacade";
import { executeQueryString } from "@/logic/insights/QueryDoer";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

import { getSubjects } from "../../storage/subject";
import type { Subject } from "../../storage/subject";

/* ---------------- helpers ---------------- */

const msToMinutes = (ms: number) => Math.round(ms / 60000);

const chartConfig = {
  minutes: {
    label: "Minutes",
  },
};

/** deterministic hash -> hue */
function hashToHue(str: string) {
  let h = 2167; // seed
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  // positive
  const hue = Math.abs(h) % 360;
  return hue;
}
function subjectColor(subjectIdOrName: string) {
  const hue = hashToHue(subjectIdOrName);
  // Soft pastel: Saturation 45-60%, Lightness 75-85%
  const saturation = 50 + (hue % 10); 
  const lightness = 80 + (hue % 5);
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

/** simple legend component (outside ChartContainer to keep ChartContainer single child) */
function SubjectsLegend({
  subjects,
  map,
  colorFor,
}: {
  subjects: string[]; // subjectIds
  map: Record<string, string>;
  colorFor: (idOrName: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {subjects.map((id) => {
        const name = map[id] ?? id;
        return (
          <div key={id} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ background: colorFor(name) }}
            />
            <span className="truncate max-w-[160px]">{name}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================= */
/* DAILY (stacked single bar representing today's subjects)  */
/* ========================================================= */

export function DailyBreakdown({
  queryString = "{}",
}: {
  queryString?: string;
}) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subjectMap, setSubjectMap] = useState<Record<string, string>>({});
  const [todayResult, setTodayResult] = useState<any | null>(null);

  useEffect(() => {
    executeQueryString(queryString).then(setSessions);
  }, [queryString]);

  useEffect(() => {
    let mounted = true;
    getSubjects()
      .then((list: Subject[]) => {
        if (!mounted) return;
        setSubjectMap(Object.fromEntries(list.map((s) => [s.id, s.name])));
      })
      .catch((e) => console.error("getSubjects failed", e));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadToday() {
      try {
        const res = await DefaultQueries.timeDoneToday();
        if (!mounted) return;
        setTodayResult(res);
      } catch (e) {
        console.error("timeDoneToday failed", e);
        if (!mounted) return;
        setTodayResult(null);
      }
    }
    loadToday();
    return () => {
      mounted = false;
    };
  }, [sessions]);

  const bySubject = todayResult?.bySubject ?? [];

  // Build single stacked data object: { label: 'Today', [subjectName]: minutes }
  const dataItem: Record<string, string | number> = { label: "Today" };
  const subjectIds = bySubject.map((s: any) => s.subjectId ?? "no-subject");
  bySubject.forEach((s: any) => {
    const id = s.subjectId ?? "no-subject";
    const minutes = msToMinutes(s.totalMs ?? 0);
    const name = subjectMap[id] ?? id;
    dataItem[name] = minutes;
  });

  const orderedSubjectNames = subjectIds.map(
    (id: string) => subjectMap[id] ?? id,
  );

  return (
    <Card className="bg-transparent shadow-none border">
      <CardHeader>
        <CardTitle>Today</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[320px] w-full bg-transparent"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[dataItem]}
              margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
              style={{ background: "transparent" }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}m`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              {orderedSubjectNames.map((name: string, id: string) => (
                <Bar
                  key={name}
                  dataKey={name}
                  stackId="a"
                  fill={subjectColor(name)}
                  radius={[8, 8, 8, 8]} // ALL corners rounded
                  isAnimationActive={true}
                  animationDuration={600}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <SubjectsLegend
          subjects={subjectIds}
          map={subjectMap}
          colorFor={subjectColor}
        />
      </CardContent>
    </Card>
  );
}

/* ========================================================= */
/* WEEK (stacked bars, each day broken down by subject)      */
/* ========================================================= */

export function WeeklyBreakdown({
  queryString = "{}",
}: {
  queryString?: string;
}) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subjectMap, setSubjectMap] = useState<Record<string, string>>({});
  const [weekResult, setWeekResult] = useState<any | null>(null);
  const [topSubjectsResult, setTopSubjectsResult] = useState<any[] | null>(
    null,
  );
  const [subjectWeeks, setSubjectWeeks] = useState<Record<string, any>>({}); // subjectId -> subjectThisWeek result

  useEffect(() => {
    executeQueryString(queryString).then(setSessions);
  }, [queryString]);

  useEffect(() => {
    let mounted = true;
    getSubjects()
      .then((list: Subject[]) => {
        if (!mounted) return;
        setSubjectMap(Object.fromEntries(list.map((s) => [s.id, s.name])));
      })
      .catch((e) => console.error("getSubjects failed", e));
    return () => {
      mounted = false;
    };
  }, []);

  // load week summary
  useEffect(() => {
    let mounted = true;
    async function loadWeek() {
      try {
        const w = await DefaultQueries.weeklyBreakdown();
        if (!mounted) return;
        setWeekResult(w);
      } catch (e) {
        console.error("weeklyBreakdown failed", e);
        if (!mounted) return;
        setWeekResult(null);
      }
    }
    loadWeek();
    return () => {
      mounted = false;
    };
  }, [sessions]);

  // load top subjects (for deciding which subjects to show)
  useEffect(() => {
    let mounted = true;
    async function loadTop() {
      try {
        const top = await DefaultQueries.topSubjects(8);
        if (!mounted) return;
        setTopSubjectsResult(top);
      } catch (e) {
        console.error("topSubjects failed", e);
        if (!mounted) return;
        setTopSubjectsResult([]);
      }
    }
    loadTop();
    return () => {
      mounted = false;
    };
  }, [sessions]);

  // once we have top subjects (or sessions fallback), load subjectThisWeek for each subjectId
  useEffect(() => {
    let mounted = true;
    async function loadSubjectWeeks() {
      const subjectIds =
        topSubjectsResult && topSubjectsResult.length > 0
          ? topSubjectsResult.map((t: any) => t.subjectId ?? "no-subject")
          : Array.from(
              new Set(
                (sessions || []).map((s: any) => s.subjectId).filter(Boolean),
              ),
            );
      try {
        const promises = subjectIds.map((id) =>
          DefaultQueries.subjectThisWeek(id),
        );
        const results = await Promise.all(promises);
        if (!mounted) return;
        const map: Record<string, any> = {};
        subjectIds.forEach((id, idx) => {
          map[id] = results[idx];
        });
        setSubjectWeeks(map);
      } catch (e) {
        console.error("subjectThisWeek batch failed", e);
        if (!mounted) return;
        setSubjectWeeks({});
      }
    }
    // only load when we at least have sessions or topSubjectsResult determined
    if (topSubjectsResult !== null || sessions.length > 0) {
      loadSubjectWeeks();
    }
    return () => {
      mounted = false;
    };
  }, [topSubjectsResult, sessions]);

  const dayDates: string[] = (weekResult?.days ?? []).map(
    (d: any) => d.date as string,
  );
  const dayLabels = dayDates.map((d: string) => d.slice(5));

  // gather subjects to render (top N or all found)
  const subjectIds =
    topSubjectsResult && topSubjectsResult.length > 0
      ? topSubjectsResult.map((t: any) => t.subjectId ?? "no-subject")
      : Array.from(
          new Set(
            (sessions || []).map((s: any) => s.subjectId).filter(Boolean),
          ),
        );

  // Build data array: each day is an object { date: 'MM-DD', [subjectName]: minutes }
  const data = dayDates.map((dateIso: string, idx: number) => {
    const obj: Record<string, string | number> = {
      date: dayLabels[idx] ?? dateIso.slice(5),
    };
    return obj;
  });

  subjectIds.forEach((subjectId) => {
    const subjectWeek = subjectWeeks[subjectId];
    const daily = subjectWeek?.daily ?? [];
    daily.forEach((d: any) => {
      const dateShort = d.date.slice(5);
      const minutes = msToMinutes(d.totalMs ?? 0);
      const row = data.find((r) => (r.date as string) === dateShort);
      const name = subjectMap[subjectId] ?? subjectId;
      if (row) {
        row[name] = minutes;
      } else {
        const idx = dayDates.findIndex((dd) => dd.slice(5) === d.date.slice(5));
        if (idx !== -1) data[idx][name] = minutes;
      }
    });
  });

  const orderedSubjectNames = subjectIds.map((id) => subjectMap[id] ?? id);

  return (
    <Card className="bg-transparent shadow-none border">
      <CardHeader>
        <CardTitle>This week</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full bg-transparent"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
              style={{ background: "transparent" }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}m`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {orderedSubjectNames.map((name) => (
                <Bar
                  key={name}
                  dataKey={name}
                  stackId="a"
                  fill={subjectColor(name)}
                  barSize={18} // tuned thickness
                  isAnimationActive={false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <SubjectsLegend
          subjects={subjectIds}
          map={subjectMap}
          colorFor={(n) => subjectColor(n)}
        />
      </CardContent>

      <CardFooter>
        Total: {msToMinutes(weekResult?.weekTotal ?? 0)} min
      </CardFooter>
    </Card>
  );
}

/* ========================================================= */
/* SUBJECT / TOP SUBJECTS (with range dropdown / controls)   */
/* ========================================================= */

export function SubjectsThisWeekBreakdown({
  queryString = "{}",
  subjectId,
}: {
  queryString?: string;
  subjectId?: string;
}) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subjectMap, setSubjectMap] = useState<Record<string, string>>({});
  const [topRange, setTopRange] = useState<
    "week" | "month" | "year" | "last30" | "custom"
  >("week");
  const [customFrom, setCustomFrom] = useState<string>("");
  const [customTo, setCustomTo] = useState<string>("");
  const [subjectDetail, setSubjectDetail] = useState<any | null>(null);
  const [topSubjectsResult, setTopSubjectsResult] = useState<any[] | null>(
    null,
  );

  useEffect(() => {
    executeQueryString(queryString).then(setSessions);
  }, [queryString]);

  useEffect(() => {
    let mounted = true;
    getSubjects()
      .then((list: Subject[]) => {
        if (!mounted) return;
        setSubjectMap(Object.fromEntries(list.map((s) => [s.id, s.name])));
      })
      .catch((e) => console.error("getSubjects failed", e));
    return () => {
      mounted = false;
    };
  }, []);

  function handleTopRangeSubmit(e?: React.FormEvent) {
    e?.preventDefault?.();
    // TODO: If you support a query string that filters sessions by date range,
    // build it here and call executeQueryString(...) to replace sessions.
    // For now we rely on client-side DefaultQueries.
    console.log(
      "Requested top subjects range:",
      topRange,
      customFrom,
      customTo,
    );
  }

  /* ---------- SINGLE-SUBJECT VIEW ---------- */
  useEffect(() => {
    let mounted = true;
    async function loadSubject() {
      if (!subjectId) {
        setSubjectDetail(null);
        return;
      }
      try {
        const s = await DefaultQueries.subjectThisWeek(subjectId);
        if (!mounted) return;
        setSubjectDetail(s);
      } catch (e) {
        console.error("subjectThisWeek failed", e);
        if (!mounted) return;
        setSubjectDetail(null);
      }
    }
    loadSubject();
    return () => {
      mounted = false;
    };
  }, [sessions, subjectId]);

  if (subjectId) {
    const data = (subjectDetail?.daily ?? []).map((d: any) => ({
      date: d.date.slice(5),
      minutes: msToMinutes(d.totalMs),
    }));

    const title = subjectMap[subjectId] ?? subjectId;

    return (
      <Card className="bg-transparent shadow-none border">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-[250px] w-full bg-transparent"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}m`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="minutes"
                  stroke={subjectColor(title)}
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }

  /* ---------- TOP-SUBJECTS VIEW ---------- */
  useEffect(() => {
    let mounted = true;
    async function loadTop() {
      try {
        const top = await DefaultQueries.topSubjects(12);
        if (!mounted) return;
        setTopSubjectsResult(top);
      } catch (e) {
        console.error("topSubjects failed", e);
        if (!mounted) return;
        setTopSubjectsResult([]);
      }
    }
    loadTop();
    return () => {
      mounted = false;
    };
  }, [sessions]);

  const top = topSubjectsResult ?? [];

  const data = top.map((t: any) => ({
    name: subjectMap[t.subjectId] ?? t.subjectId,
    minutes: msToMinutes(t.totalMs),
    subjectId: t.subjectId,
  }));

  const subjectIds = top.map((t: any) => t.subjectId);

  return (
    <Card className="bg-transparent shadow-none border">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <CardTitle>Top subjects</CardTitle>

          {/* controls */}
          <form
            className="flex gap-3 items-center"
            onSubmit={handleTopRangeSubmit}
          >
            <select
              value={topRange}
              onChange={(e) => setTopRange(e.target.value as any)}
              className="bg-muted/30 border border-muted rounded-full px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer transition-shadow"
            >
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="year">This year</option>
              <option value="last30">Last 30 days</option>
              <option value="custom">Custom range</option>
            </select>

            {topRange === "custom" && (
              <>
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="bg-muted/30 border border-muted rounded-full px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="bg-muted/30 border border-muted rounded-full px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </>
            )}

            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-4 py-1.5 text-sm shadow-sm transition-all hover:-translate-y-0.5"
            >
              Apply
            </button>
          </form>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full bg-transparent"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
              style={{ background: "transparent" }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}m`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {/* single Bar; we color each bar via Cell */}
              <Bar dataKey="minutes" radius={8} isAnimationActive={false}>
                {data.map((entry) => (
                  <Cell key={entry.subjectId} fill={subjectColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* summary grid below the chart */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {data.map((d) => (
            <div key={d.subjectId} className="flex items-center gap-3 text-sm">
              <span
                className="w-3 h-3 inline-block rounded-sm"
                style={{ background: subjectColor(d.name) }}
              />
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">
                  {d.minutes} min
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
