import { useEffect, useState, useCallback } from "react";
import DefaultQueries from "@/logic/insights/IInsightFacade";
import {
  DailyBreakdown,
  WeeklyBreakdown,
  SubjectsThisWeekBreakdown,
} from "./DailyBreakdown";
import { getUserData, setDailyGoal } from "@/storage/rewards";
import { NavLink } from "react-router-dom";
import { Coins, Flame, Target, ShoppingBag, Edit3, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  bgColor = "bg-card",
}: {
  label: string;
  value: number | string;
  suffix?: string;
  icon: string;
  bgColor?: string;
}) {
  return (
    <div className={`h-[132px] rounded-3xl p-6 ${bgColor} hover:scale-[1.02] transition-transform`}>
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
    hours >= 5 && hours < 12
      ? "Good morning ☀️"
      : hours >= 12 && hours < 17
        ? "Good afternoon 🌤️"
        : hours >= 17 && hours < 22
          ? "Good evening 🌙"
          : "Burning the midnight oil? 🦉";

  const [todayMinutes, setTodayMinutes] = useState<number>(0);
  const [weekMinutes, setWeekMinutes] = useState<number>(0);
  const [productivityRating, setProductivityRating] = useState<number | null>(null);

  // User progress state
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [dailyGoal, setDailyGoalState] = useState(60);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState("60");
  const [userLoading, setUserLoading] = useState(true);

  const loadUserData = useCallback(async () => {
    try {
      const user = await getUserData();
      if (user) {
        setCoins(user.currencyBalance);
        setStreak(user.currentStreak);
        setDailyGoalState(user.dailyGoalMinutes);
        setGoalInput(String(user.dailyGoalMinutes));
      }
    } catch {
      // silently fail
    } finally {
      setUserLoading(false);
    }
  }, []);

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
    loadUserData();
    return () => {
      mounted = false;
    };
  }, [loadUserData]);

  const goalProgress = dailyGoal > 0 ? Math.min(todayMinutes / dailyGoal, 1) : 0;
  const goalMet = todayMinutes >= dailyGoal;

  const handleSaveGoal = async () => {
    const val = parseInt(goalInput);
    if (!isNaN(val) && val > 0) {
      await setDailyGoal(val);
      setDailyGoalState(val);
    }
    setEditingGoal(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Greeting */}
      <div>
        <h1 className="text-4xl font-serif font-semibold">{greeting}</h1>
      </div>

      {/* Progress Row: Coins, Streak, Daily Goal */}
      {!userLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Coin Balance */}
          <NavLink to="/store" className="block">
            <div className="rounded-2xl border bg-yellow-50/60 dark:bg-yellow-900/10 border-yellow-200/80 p-5 hover:shadow-md hover:shadow-yellow-200/30 hover:-translate-y-0.5 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium mb-2">
                <Coins className="h-4 w-4" />
                Coin Balance
              </div>
              <div className="text-3xl font-bold text-yellow-700">{coins.toLocaleString()}</div>
              <div className="text-xs text-yellow-600/70 mt-1 flex items-center gap-1">
                <ShoppingBag className="h-3 w-3" />
                Visit the store →
              </div>
            </div>
          </NavLink>

          {/* Streak */}
          <div className="rounded-2xl border bg-orange-50/60 dark:bg-orange-900/10 border-orange-200/80 p-5 h-full">
            <div className="flex items-center gap-2 text-orange-600 text-sm font-medium mb-2">
              <Flame className="h-4 w-4" />
              Study Streak
            </div>
            <div className="text-3xl font-bold text-orange-700 flex items-end gap-1">
              {streak}
              <span className="text-sm font-medium text-orange-500 mb-0.5">
                {streak === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="text-xs text-orange-500/70 mt-1">
              {streak === 0
                ? "Start a session to begin your streak!"
                : streak === 1
                  ? "Keep it up tomorrow! 💪"
                  : `${streak} days and counting! 🔥`}
            </div>
          </div>

          {/* Daily Goal */}
          <div className="rounded-2xl border bg-blue-50/60 dark:bg-blue-900/10 border-blue-200/80 p-5 h-full">
            <div className="flex items-center justify-between text-blue-600 text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Daily Goal
              </div>
              {!editingGoal ? (
                <button
                  onClick={() => setEditingGoal(true)}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              ) : (
                <div className="flex gap-1">
                  <button
                    onClick={handleSaveGoal}
                    className="text-green-500 hover:text-green-700 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => { setEditingGoal(false); setGoalInput(String(dailyGoal)); }}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {editingGoal ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="h-8 text-sm w-24 border-blue-200"
                  min={1}
                  autoFocus
                />
                <span className="text-sm text-blue-600">min/day</span>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold text-blue-700 flex items-end gap-1">
                  {todayMinutes}
                  <span className="text-sm font-medium text-blue-500 mb-0.5">/ {dailyGoal} min</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-blue-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      goalMet ? "bg-green-400" : "bg-blue-400"
                    }`}
                    style={{ width: `${goalProgress * 100}%` }}
                  />
                </div>
                {goalMet && (
                  <div className="text-xs text-green-600 font-medium mt-1.5">
                    ✅ Daily goal crushed! Streak extended 🎉
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Stats + Daily Chart */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="grid gap-6">
          <StatCard
            label="Time studied today"
            value={todayMinutes}
            suffix=" min"
            icon="⏱️"
            bgColor="bg-primary/20"
          />
          <StatCard
            label="Time studied this week"
            value={weekMinutes}
            suffix=" min"
            icon="📅"
            bgColor="bg-secondary/30"
          />
          <StatCard
            label="Productivity"
            value={productivityText(productivityRating)}
            icon={productivityIcon(productivityRating)}
            bgColor="bg-accent/30"
          />
        </div>
        <div className="h-[450px]">
          <DailyBreakdown />
        </div>
      </div>

      {/* Weekly + Subjects Breakdown */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 h-[340px]">
          <WeeklyBreakdown />
        </div>
        <div className="h-[340px]">
          <SubjectsThisWeekBreakdown />
        </div>
      </div>
    </div>
  );
}
