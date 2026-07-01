import { useState, useEffect, useCallback } from "react";
import {
  ShoppingBag,
  Plus,
  Coins,
  Gift,
  RotateCcw,
  Trash2,
  Flame,
  Target,
  X,
  Check,
  Star,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getRewards,
  addReward,
  purchaseReward,
  removeReward,
  getUserData,
  DEFAULT_REWARDS,
} from "@/storage/rewards";
import type { Reward } from "@/storage/rewards";

type UserData = {
  currencyBalance: number;
  currentStreak: number;
  dailyGoalMinutes: number;
};

type PurchaseResult = {
  reward: Reward;
  success: boolean;
};


export function StorePage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRewardName, setNewRewardName] = useState("");
  const [newRewardCost, setNewRewardCost] = useState("100");
  const [newRewardIsOneTime, setNewRewardIsOneTime] = useState(false);
  const [addingDefaults, setAddingDefaults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const [rewardList, user] = await Promise.all([
        getRewards({ networkOnly: forceRefresh }),
        getUserData({ networkOnly: forceRefresh }),
      ]);
      setRewards(rewardList);
      if (user) {
        setUserData({
          currencyBalance: user.currencyBalance,
          currentStreak: user.currentStreak,
          dailyGoalMinutes: user.dailyGoalMinutes,
        });
      }
    } catch (err: any) {
      console.error("Failed to load store data:", err);
      setError(err.message || "Failed to load store data. Please make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePurchase = async (reward: Reward) => {
    if (!userData) return;
    if (userData.currencyBalance < reward.cost) {
      setError("Insufficient coins!");
      return;
    }
    setError(null);
    try {
      await purchaseReward(reward, userData.currencyBalance);
      setPurchaseResult({ reward, success: true });
      await loadData(true);
      setTimeout(() => setPurchaseResult(null), 4000);
    } catch (err: any) {
      console.error("Failed to purchase reward:", err);
      setError(err.message || "Failed to purchase reward.");
    }
  };

  const handleAddReward = async () => {
    if (!newRewardName.trim() || !newRewardCost) return;

    // Check for duplicate reward name locally
    const nameExists = rewards.some(
      (r) => r.name.toLowerCase() === newRewardName.trim().toLowerCase()
    );
    if (nameExists) {
      setError("A reward with this name already exists.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await addReward(newRewardName.trim(), parseInt(newRewardCost), newRewardIsOneTime);
      setNewRewardName("");
      setNewRewardCost("100");
      setNewRewardIsOneTime(false);
      setShowAddForm(false);
      await loadData(true);
    } catch (err: any) {
      console.error("Failed to add reward:", err);
      setError(err.message || "Failed to add reward.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddDefaults = async () => {
    setAddingDefaults(true);
    setError(null);
    try {
      for (const r of DEFAULT_REWARDS) {
        await addReward(r.name, r.cost, r.isOneTime);
      }
      await loadData(true);
    } catch (err: any) {
      console.error("Failed to add default rewards:", err);
      setError(err.message || "Failed to add default rewards.");
    } finally {
      setAddingDefaults(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await removeReward(id);
      await loadData(true);
    } catch (err: any) {
      console.error("Failed to delete reward:", err);
      setError(err.message || "Failed to delete reward.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Purchase Success Overlay */}
      {purchaseResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto bg-background border shadow-2xl shadow-primary/20 rounded-2xl p-8 max-w-sm w-full mx-4 text-center animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-bold text-foreground mb-2 mt-4">Enjoy your treat!</h2>
            <p className="text-muted-foreground text-sm mb-4">
              You redeemed{" "}
              <span className="font-semibold text-foreground">
                {purchaseResult.reward.name}
              </span>{" "}
              — you've earned it!
            </p>
            {purchaseResult.reward.isOneTime && (
              <p className="text-xs text-muted-foreground/60 mb-6">
                This was a one-time self-gift and has been removed from your store.
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPurchaseResult(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Reward Store</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Spend your hard-earned coins on treats for yourself.
          </p>
        </div>

        {/* Coin balance */}
        {userData && (
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-5 py-2.5">
            <Coins className="h-5 w-5 text-yellow-500" />
            <span className="font-bold text-yellow-700 text-lg">
              {userData.currencyBalance.toLocaleString()}
            </span>
            <span className="text-yellow-600 text-sm font-medium">coins</span>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground dark:text-red-200 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertTriangle className="h-5 w-5 shrink-0 text-destructive dark:text-red-400" />
          <div className="text-sm font-medium flex-1">{error}</div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setError(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Streak / Goal bar */}
      {userData && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">
                Current Streak
              </p>
              <p className="text-2xl font-bold text-orange-700">
                {userData.currentStreak}{" "}
                <span className="text-sm font-medium text-orange-500">
                  {userData.currentStreak === 1 ? "day" : "days"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                Daily Goal
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {userData.dailyGoalMinutes}{" "}
                <span className="text-sm font-medium text-blue-500">min/day</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Your Rewards
          </h2>
          <div className="flex gap-2">
            {rewards.length === 0 && !loading && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddDefaults}
                disabled={addingDefaults}
                className="text-xs"
              >
                <Star className="h-3.5 w-3.5 mr-1" />
                {addingDefaults ? "Adding..." : "Add defaults"}
              </Button>
            )}
            <Button size="sm" onClick={() => setShowAddForm((v) => !v)}>
              {showAddForm ? (
                <>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  New Reward
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Add Reward form */}
        {showAddForm && (
          <div className="bg-muted/30 border rounded-xl p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="reward-name">Reward name</Label>
                <Input
                  id="reward-name"
                  placeholder="e.g. Watch a movie"
                  value={newRewardName}
                  onChange={(e) => setNewRewardName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reward-cost">Cost (coins)</Label>
                <Input
                  id="reward-cost"
                  type="number"
                  min={1}
                  placeholder="100"
                  value={newRewardCost}
                  onChange={(e) => setNewRewardCost(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setNewRewardIsOneTime(!newRewardIsOneTime)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                  newRewardIsOneTime ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full shadow transition-transform duration-200 ${
                    newRewardIsOneTime ? "translate-x-5" : ""
                  }`}
                />
              </button>
              <div>
                <p className="text-sm font-medium">
                  {newRewardIsOneTime ? "One-time gift" : "Repeatable reward"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {newRewardIsOneTime
                    ? "Disappears after redeeming — for special treats"
                    : "Stays in store forever — for everyday rewards"}
                </p>
              </div>
            </div>
            <Button onClick={handleAddReward} disabled={submitting || !newRewardName.trim()}>
              <Check className="h-4 w-4 mr-1" />
              {submitting ? "Adding..." : "Add Reward"}
            </Button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-muted/40 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : rewards.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="font-medium">No rewards yet</p>
            <p className="text-sm mt-1">
              Add default rewards or create your own to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => {
              const canAfford = userData ? userData.currencyBalance >= reward.cost : false;
              return (
                <div
                  key={reward.id}
                  className={`relative group border rounded-xl p-4 transition-all duration-200 ${
                    canAfford
                      ? "bg-background hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
                      : "bg-muted/20 opacity-70"
                  }`}
                >
                  {/* One-time badge */}
                  {reward.isOneTime && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      <Gift className="h-3 w-3" />
                      One-time
                    </div>
                  )}

                  <div className="mb-4 pr-16">
                    <p className="font-semibold text-foreground leading-tight">
                      {reward.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Coins className="h-3.5 w-3.5 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-600">
                        {reward.cost} coins
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 text-xs"
                      disabled={!canAfford}
                      onClick={() => handlePurchase(reward)}
                    >
                      {canAfford ? "Redeem" : "Not enough coins"}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-red-500"
                      onClick={() => handleDelete(reward.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Refresh button */}
      <div className="text-right">
        <Button variant="ghost" size="sm" onClick={() => loadData(true)} className="text-muted-foreground">
          <RotateCcw className="h-3.5 w-3.5 mr-1" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
