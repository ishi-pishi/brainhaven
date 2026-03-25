import {
  createReward,
  deleteReward,
  listRewards,
  updateUserProgress,
  me,
} from "@dataconnect/generated";

export type Reward = {
  id: string;
  name: string;
  cost: number;
  isOneTime: boolean;
};

export const DEFAULT_REWARDS: Omit<Reward, "id">[] = [
  { name: "Take a hot bath 🛁", cost: 300, isOneTime: false },
  { name: "Play video games 🎮", cost: 500, isOneTime: false },
  { name: "Watch a movie 🎬", cost: 500, isOneTime: false },
  { name: "Order your favourite food 🍕", cost: 400, isOneTime: true },
  { name: "Buy yourself a small treat ☕", cost: 350, isOneTime: true },
  { name: "Take a day off 🌿", cost: 1500, isOneTime: true },
];

// Exchange rate: coins per minute studied (rounded)
export const COINS_PER_MINUTE = 5;

// Calculates currency earned from a session
export function calculateEarnedCurrency(workMs: number): number {
  const minutes = workMs / 60000;
  return Math.round(minutes * COINS_PER_MINUTE);
}

// Fetch all rewards for the user
export async function getRewards(): Promise<Reward[]> {
  const { data } = await listRewards();
  return data.rewards.map((r) => ({
    id: r.id,
    name: r.name,
    cost: r.cost,
    isOneTime: r.isOneTime,
  }));
}

// Add a new reward
export async function addReward(name: string, cost: number, isOneTime: boolean): Promise<void> {
  await createReward({ name, cost, isOneTime });
}

// Remove a reward
export async function removeReward(id: string): Promise<void> {
  await deleteReward({ id });
}

// Get current user data (currencyBalance, streak, etc.)
export async function getUserData() {
  const { data } = await me();
  return data.user;
}

// Deduct currency and optionally remove a one-time reward
export async function purchaseReward(reward: Reward, currentBalance: number): Promise<void> {
  if (currentBalance < reward.cost) {
    throw new Error("Insufficient coins!");
  }

  const newBalance = currentBalance - reward.cost;
  await updateUserProgress({ currencyBalance: newBalance });

  // Delete the reward if it's a one-time self-gift
  if (reward.isOneTime) {
    await removeReward(reward.id);
  }
}

// Update user's daily goal
export async function setDailyGoal(minutes: number): Promise<void> {
  await updateUserProgress({ dailyGoalMinutes: minutes });
}

// Update currency balance + check streaks after a session
export async function postSessionUpdate(
  earnedCurrency: number,
  workMinutes: number,
  currentBalance: number,
  currentStreak: number,
  dailyGoalMinutes: number,
  lastGoalMetDate: string | null | undefined
): Promise<{ newBalance: number; newStreak: number; goalMet: boolean }> {
  const newBalance = currentBalance + earnedCurrency;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let newStreak = currentStreak;
  let goalMet = false;

  if (workMinutes >= dailyGoalMinutes) {
    goalMet = true;
    const lastDate = lastGoalMetDate ? new Date(lastGoalMetDate) : null;
    if (lastDate) lastDate.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (!lastDate) {
      newStreak = 1;
    } else if (lastDate.getTime() === yesterday.getTime()) {
      // Continued streak
      newStreak = currentStreak + 1;
    } else if (lastDate.getTime() === today.getTime()) {
      // Already met goal today, keep streak
      newStreak = currentStreak;
    } else {
      // Streak broken
      newStreak = 1;
    }

    await updateUserProgress({
      currencyBalance: newBalance,
      currentStreak: newStreak,
      lastGoalMetDate: today.toISOString(),
    });
  } else {
    await updateUserProgress({ currencyBalance: newBalance });
  }

  return { newBalance, newStreak, goalMet };
}

// Initialize a new user with default rewards
export async function initializeUserRewards(): Promise<void> {
  try {
    const existing = await getRewards();
    if (existing.length === 0) {
      for (const r of DEFAULT_REWARDS) {
        await addReward(r.name, r.cost, r.isOneTime);
      }
    }
  } catch (err) {
    console.error("Failed to initialize user rewards:", err);
  }
}
