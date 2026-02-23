import React, { useEffect, useMemo, useState } from "react";
import DefaultQueries from "@/logic/insights/IInsightFacade";
import { DailyBreakdown, WeeklyBreakdown, SubjectsThisWeekBreakdown } from "./DailyBreakdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 800;
    const startTime = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);
  return <>{display}</>;
}

function productivityIcon(p: number) {
  if (p >= 90) return "🚀";
  if (p >= 80) return "✅";
  if (p >= 65) return "👍";
  if (p >= 50) return "😐";
  return "🥱";
}

function StatCard({ label, value, suffix, icon }: { label: string; value: number; suffix?: string; icon: string; }) {
  return (
    <div className="h-[132px] rounded-3xl p-6 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 hover:scale-[1.02] transition-transform">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        {label}
      </div>
      <div className="text-3xl font-semibold mt-2">
        <AnimatedNumber value={value} />{suffix}
      </div>
    </div>
  );
}

export function DashBoardComp() {
  const hours = new Date().getHours();
  const greeting =
    hours < 12 ? "Good morning ☀️" : hours < 18 ? "Good afternoon 🌤️" : "Good evening 🌙";

  const [todayMinutes, setTodayMinutes] = useState<number>(0);
  const [weekMinutes, setWeekMinutes] = useState<number>(0);
  const [productivityPercent, setProductivityPercent] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      try {
        const today = await DefaultQueries.timeDoneToday();
        const week = await DefaultQueries.weeklyBreakdown();
        const goalMinutes = 120;

        if (!mounted) return;
        const tMin = Math.floor((today?.totalMs ?? 0) / 60000);
        const wMin = Math.floor((week?.weekTotal ?? 0) / 60000);
        const p = Math.min(100, Math.round((tMin / goalMinutes) * 100));

        setTodayMinutes(tMin);
        setWeekMinutes(wMin);
        setProductivityPercent(p);
      } catch (e) {
        console.error("Failed to load dashboard stats", e);
        if (!mounted) return;
        setTodayMinutes(0);
        setWeekMinutes(0);
        setProductivityPercent(0);
      }
    }

    loadStats();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-semibold">{greeting}</h1>
        <p className="text-muted-foreground">Review your studying below.</p>
      </div>

      {/* Stats + Daily Chart */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="grid gap-4">
          <StatCard label="Time studied today" value={todayMinutes} suffix=" min" icon="⏱️" />
          <StatCard label="Time studied this week" value={weekMinutes} suffix=" min" icon="📅" />
          <StatCard
            label="Productivity"
            value={productivityPercent}
            suffix="%"
            icon={productivityIcon(productivityPercent)}
          />
        </div>
        <div className="h-[450]"><DailyBreakdown /></div>
      </div>

      {/* Reflection card moved up */}
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Your reflections and suggestions will appear here.
          </p>
          <p className="text-sm text-muted-foreground">
            Example:
            <br />
            You've studied for {Math.floor(weekMinutes / 60)} hours this week. Consider taking a 20-minute break.
            <br />
            Your productivity is {productivityPercent}% today — keep going.
          </p>
        </CardContent>
      </Card>

      {/* Weekly + Subjects Breakdown */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 h-[340px]"><WeeklyBreakdown /></div>
        <div className="h-[220px]"><SubjectsThisWeekBreakdown /></div>
      </div>
    </div>
  );
}