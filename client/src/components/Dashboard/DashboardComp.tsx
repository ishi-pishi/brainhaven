import { useEffect, useState, useCallback } from "react";
import DefaultQueries from "@/logic/insights/IInsightFacade";
import {
  DailyBreakdown,
  WeeklyBreakdown,
  SubjectsThisWeekBreakdown,
} from "./DailyBreakdown";
import { getUserData, setDailyGoal } from "@/storage/rewards";
import { NavLink } from "react-router-dom";
import { Coins, Flame, Target, Edit3, Check, X, Clock } from "lucide-react";
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

export function DashBoardComp() {
  const hours = new Date().getHours();
  const greeting =
    hours >= 5 && hours < 12
      ? "Good morning"
      : hours >= 12 && hours < 17
        ? "Good afternoon"
        : hours >= 17 && hours < 22
          ? "Good evening"
          : "Burning the midnight oil?";

  const [todayMinutes, setTodayMinutes] = useState<number>(0);
  const [weekMinutes, setWeekMinutes] = useState<number>(0);

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

        if (!mounted) return;
        const tMin = Math.floor((today?.totalMs ?? 0) / 60000);
        const wMin = Math.floor((week?.weekTotal ?? 0) / 60000);

        setTodayMinutes(tMin);
        setWeekMinutes(wMin);
      } catch (e) {
        console.error("Failed to load dashboard stats", e);
        if (!mounted) return;
        setTodayMinutes(0);
        setWeekMinutes(0);
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
    <div className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Top Section: Greeting, Stats (Left) and Daily Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Greeting + Quick Stats Grid (7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Greeting */}
          <div>
            <h1 className="text-3xl font-serif font-semibold tracking-tight text-foreground">{greeting}</h1>
          </div>

          {!userLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 flex-1">
              
              {/* Today's Focus Card (span 5) */}
              <div className="sm:col-span-5 rounded-3xl border bg-card p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group min-h-[200px]">
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
                
                <div>
                  <div className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Today
                  </div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      <AnimatedNumber value={todayMinutes} />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">min</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>Progress</span>
                    <span className={goalMet ? "text-emerald-600 font-bold" : "text-primary"}>
                      {Math.round(goalProgress * 100)}%
                    </span>
                  </div>
                  
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        goalMet ? "bg-emerald-500" : "bg-primary"
                      }`}
                      style={{ width: `${goalProgress * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                    <span>Goal: {dailyGoal}m</span>
                    {goalMet ? (
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="h-3 w-3" /> Goal met!
                      </span>
                    ) : (
                      <span>{Math.max(0, dailyGoal - todayMinutes)}m left</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid (span 7) */}
              <div className="sm:col-span-7 grid grid-cols-2 gap-4">
                {/* Coins */}
                <NavLink to="/store" className="block h-full">
                  <div className="rounded-3xl border bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10 dark:bg-yellow-500/5 dark:border-yellow-500/10 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full flex flex-col justify-between min-h-[110px]">
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 text-xs font-bold uppercase tracking-wider">
                      <Coins className="h-5 w-5" />
                      Coins
                    </div>
                    <div className="mt-2">
                      <div className="text-3xl font-extrabold tracking-tight text-yellow-700 dark:text-yellow-400">
                        <AnimatedNumber value={coins} />
                      </div>
                      <div className="text-xs text-yellow-600/70 dark:text-yellow-500/60 mt-1 font-medium">
                        Shop store →
                      </div>
                    </div>
                  </div>
                </NavLink>

                {/* Streak */}
                <div className="rounded-3xl border bg-orange-500/5 border-orange-500/10 p-5 h-full flex flex-col justify-between min-h-[110px] hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 text-xs font-bold uppercase tracking-wider">
                    <Flame className="h-5 w-5" />
                    Streak
                  </div>
                  <div className="mt-2">
                    <div className="text-3xl font-extrabold tracking-tight text-orange-700 dark:text-orange-400 flex items-baseline gap-1">
                      <AnimatedNumber value={streak} />
                      <span className="text-sm font-semibold text-orange-600 dark:text-orange-500">
                        {streak === 1 ? "day" : "days"}
                      </span>
                    </div>
                    <div className="text-xs text-orange-500/70 dark:text-orange-500/60 mt-1 font-medium">
                      {streak === 0 ? "Start today!" : "Keep going!"}
                    </div>
                  </div>
                </div>

                {/* Week Minutes */}
                <div className="rounded-3xl border bg-purple-500/5 border-purple-500/10 p-5 h-full flex flex-col justify-between min-h-[110px] hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-500 text-xs font-bold uppercase tracking-wider">
                    <Clock className="h-5 w-5" />
                    This Week
                  </div>
                  <div className="mt-2">
                    <div className="text-3xl font-extrabold tracking-tight text-purple-700 dark:text-purple-400 flex items-baseline gap-1">
                      <AnimatedNumber value={weekMinutes} />
                      <span className="text-sm font-semibold text-purple-600 dark:text-purple-500">min</span>
                    </div>
                    <div className="text-xs text-purple-500/70 dark:text-purple-500/60 mt-1 font-medium">
                      Study time
                    </div>
                  </div>
                </div>

                {/* Daily Goal */}
                <div className="rounded-3xl border bg-blue-500/5 border-blue-500/10 p-5 h-full flex flex-col justify-between min-h-[110px] hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between text-blue-600 dark:text-blue-500 text-xs font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Daily Goal
                    </div>
                    {!editingGoal ? (
                      <button
                        onClick={() => setEditingGoal(true)}
                        className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    ) : (
                      <div className="flex gap-1.5">
                        <button
                          onClick={handleSaveGoal}
                          className="text-green-500 hover:text-green-700 transition-colors cursor-pointer"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => { setEditingGoal(false); setGoalInput(String(dailyGoal)); }}
                          className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    {editingGoal ? (
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="number"
                          value={goalInput}
                          onChange={(e) => setGoalInput(e.target.value)}
                          className="h-8 text-sm w-20 border-blue-200 dark:border-blue-900 bg-background px-2 py-0 font-semibold text-blue-700 dark:text-blue-400"
                          min={1}
                          autoFocus
                        />
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-500">min</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400 flex items-baseline gap-1">
                          <AnimatedNumber value={dailyGoal} />
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-500">min</span>
                        </div>
                        <div className="text-xs text-blue-500/70 dark:text-blue-500/60 mt-1 font-medium">
                          Click edit to adjust
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Right Side: Daily Breakdown Chart (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-end">
          <DailyBreakdown />
        </div>

      </div>

      {/* Weekly + Subjects Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-4">
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

