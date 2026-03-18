import { useEffect, useState } from "react";
import DefaultQueries from "@/logic/insights/IInsightFacade";
import {
  DailyBreakdown,
  WeeklyBreakdown,
  SubjectsThisWeekBreakdown,
} from "./DailyBreakdown";

import { ReflectionTips } from "./ReflectionTips";

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

function productivityIcon(p: number | null) {
  if (p === null) return "➖";
  if (p >= 5) return "🚀";
  if (p >= 4) return "✅";
  if (p >= 3) return "👍";
  if (p >= 2) return "😐";
  return "🥱";
}

function productivityText(p: number | null) {
  if (p === null) return "N/A";
  if (p >= 5) return "Excellent";
  if (p >= 4) return "Looking good";
  if (p >= 3) return "Okay";
  if (p >= 2) return "Needs help";
  return "Terrible";
}

function StatCard({
  label,
  value,
  suffix,
  icon,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  icon: string;
}) {

  
  return (
    <div className="h-[132px] rounded-3xl p-6 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 hover:scale-[1.02] transition-transform">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        {label}
      </div>
      <div className="text-3xl font-semibold mt-2">
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
        {suffix}
      </div>
    </div>
  );
}

export function DashBoardComp() {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning ☀️"
      : hours < 18
        ? "Good afternoon 🌤️"
        : "Good evening 🌙";

  const [todayMinutes, setTodayMinutes] = useState<number>(0);
  const [weekMinutes, setWeekMinutes] = useState<number>(0);
  const [productivityRating, setProductivityRating] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      try {
        const today = await DefaultQueries.timeDoneToday();
        const week = await DefaultQueries.weeklyBreakdown();
        const prodRating = await DefaultQueries.averageProductivityToday();

        if (!mounted) return;
        const tMin = Math.floor((today?.totalMs ?? 0) / 60000);
        const wMin = Math.floor((week?.weekTotal ?? 0) / 60000);

        setTodayMinutes(tMin);
        setWeekMinutes(wMin);
        setProductivityRating(prodRating);
      } catch (e) {
        console.error("Failed to load dashboard stats", e);
        if (!mounted) return;
        setTodayMinutes(0);
        setWeekMinutes(0);
        setProductivityRating(null);
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
          <StatCard
            label="Time studied today"
            value={todayMinutes}
            suffix=" min"
            icon="⏱️"
          />
          <StatCard
            label="Time studied this week"
            value={weekMinutes}
            suffix=" min"
            icon="📅"
          />
          <StatCard
            label="Productivity"
            value={productivityText(productivityRating)}
            icon={productivityIcon(productivityRating)}
          />
        </div>
        <div className="h-[450]">
          <DailyBreakdown />
        </div>
      </div>

      <ReflectionTips />

      {/* Weekly + Subjects Breakdown */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 h-[340px]">
          <WeeklyBreakdown />
        </div>
        <div className="h-[220px]">
          <SubjectsThisWeekBreakdown />
        </div>
      </div>
    </div>
  );
}
