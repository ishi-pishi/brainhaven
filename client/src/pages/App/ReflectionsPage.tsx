import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, History, Clock, AlertTriangle, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getSessions, type StudySession as Session } from "@/storage/session";
import { callMyStudyTipsFunction } from "@/lib/firebase";
import { subjectColor } from "@/lib/utils";

export function ReflectionsPage() {
  const [tips, setTips] = useState<string | null>(null);
  const [loadingTips, setLoadingTips] = useState(true);
  const [tipsError, setTipsError] = useState<{ type: "credits" | "generic"; message: string } | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch sessions
      const allSessions = await getSessions();

      // Sort sessions descending
      const sorted = [...allSessions].sort(
        (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
      );
      setSessions(sorted);

      // 2. Fetch AI Tips
      setLoadingTips(true);
      setTipsError(null);
      try {
        const recentSessions = sorted.slice(0, 7);
        if (recentSessions.length === 0) {
          setTips("No recent study sessions to generate tips.");
          return;
        }

        const result = await callMyStudyTipsFunction(recentSessions);
        if (!result) {
          throw new Error("No study tips could be generated.");
        }

        let tipsText = null;
        if (result.data && typeof (result.data as any).tips === 'string') {
          tipsText = (result.data as any).tips;
        }

        if (!tipsText) {
          throw new Error("No study tips returned from the AI service.");
        }
        setTips(tipsText);
      } catch (error: any) {
        console.error("Failed to fetch tips:", error);

        // Let's determine if this is a credits / quota error
        const isQuotaError = 
          error.code === "resource-exhausted" || 
          error.message?.includes("resource-exhausted") ||
          error.message?.includes("Resource Exhausted") ||
          error.message?.toLowerCase().includes("quota") ||
          error.message?.includes("429");

        if (isQuotaError) {
          setTipsError({
            type: "credits",
            message: "Our daily AI insights daily quota or credits have been exhausted. Please check back tomorrow!"
          });
        } else {
          setTipsError({
            type: "generic",
            message: "Unable to generate insights at the moment. Please try again in a bit!"
          });
        }
      } finally {
        setLoadingTips(false);
      }
    }

    fetchData();
  }, []);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex justify-center p-6 md:p-12 animate-in fade-in duration-500">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-serif font-bold text-foreground">
            Reflections
          </h1>
          <p className="text-muted-foreground text-lg">
            Review your insights and scan through your past study sessions.
          </p>
        </div>

        {/* AI Insight Card */}
        <Card className="rounded-3xl border-0 shadow-xl bg-primary/5 mt-4">
          <CardHeader className="bg-primary/10 pb-8 pt-8 mb-2 rounded-t-3xl border-b border-primary/10">
            <CardTitle className="flex items-center gap-3 text-3xl font-serif">
              <div className="p-3 bg-primary/20 rounded-full">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              Your AI Insight
            </CardTitle>

          </CardHeader>
          <CardContent className="pt-6">
            {loadingTips ? (
              <div className="flex items-center gap-3 text-muted-foreground animate-pulse py-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generating your insights...
              </div>
            ) : tipsError ? (
              tipsError.type === "credits" ? (
                <div className="flex flex-col gap-3 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-xl">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="font-serif font-bold text-lg">Daily AI Quota Reached</div>
                  </div>
                  <p className="text-sm leading-relaxed text-amber-900/80 dark:text-amber-200/80">
                    {tipsError.message}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 p-5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive-foreground dark:text-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/20 rounded-xl">
                      <AlertTriangle className="h-5 w-5 text-destructive dark:text-red-400" />
                    </div>
                    <div className="font-serif font-bold text-lg">AI Service Issue</div>
                  </div>
                  <p className="text-sm leading-relaxed text-destructive-foreground/80 dark:text-red-200/80">
                    {tipsError.message}
                  </p>
                </div>
              )
            ) : tips ? (
              <div className="prose prose-sm md:prose-base prose-p:text-foreground/80 prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary max-w-full animate-in fade-in duration-300">
                <ReactMarkdown>{tips}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted-foreground py-2">
                No tips today! Go take a break.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Past Sessions History */}
        <Card className="rounded-3xl border border-border/50 shadow-sm bg-card overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-secondary/10">
            <CardTitle className="flex items-center gap-3 text-2xl font-serif">
              <History className="h-6 w-6 text-secondary" />
              Past Sessions History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              {sessions.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No past sessions yet. Start a timer to build your history!
                </div>
              ) : (
                <div className="divide-y divide-border/30">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-8 hover:bg-muted/20 transition-colors flex flex-col gap-5"
                    >
                      {/* Top Row: Meta & Time */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex flex-col gap-1.5 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span 
                              className="w-4 h-4 shrink-0 rounded-full shadow-sm border border-black/10 dark:border-white/10"
                              style={{ backgroundColor: subjectColor(session.subject || "") }}
                            />
                            <h3 className="font-serif font-bold text-2xl text-foreground truncate">
                              {session.subject}
                            </h3>
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {formatDate(session.startTime)}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="px-5 py-2 rounded-full bg-secondary/20 text-secondary-foreground font-semibold text-sm border border-secondary/10">
                            {formatDuration(session.workBlockMs)} focus / {formatDuration(session.breakBlockMs)} break
                          </div>
                          <div
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${session.status === "finished"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                              }`}
                          >
                            {session.status}
                          </div>
                        </div>
                      </div>

                      {/* Middle Row: Ratings & Notes */}
                      <div className="grid md:grid-cols-2 gap-6 items-start">
                        {/* Productivity / Stats */}
                        <div className="flex flex-col gap-2">
                          <div className="text-xs uppercase font-bold tracking-widest text-muted-foreground/60">
                            Stats
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <div className="px-3 py-1.5 rounded-2xl bg-accent/20 text-accent-foreground text-sm flex items-center gap-2">
                              <span>Rating:</span>
                              <span className="font-bold">
                                {session.productivityRating ? `${session.productivityRating}/5` : "N/A"}
                              </span>
                            </div>
                            <div className="px-3 py-1.5 rounded-2xl bg-primary/10 text-primary-foreground text-sm flex items-center gap-2">
                              <span>Earned:</span>
                              <span className="font-bold">{session.earnedCurrency || 0}</span>
                            </div>
                          </div>
                        </div>

                        {/* User Reflection Note */}
                        <div className="flex flex-col gap-2">
                          <div className="text-xs uppercase font-bold tracking-widest text-muted-foreground/60">
                            Your Personal Note
                          </div>
                          {session.reflections ? (
                            <div className="p-4 rounded-2xl bg-background border border-border/40 text-foreground/90 italic text-sm leading-relaxed shadow-inner">
                              "{session.reflections}"
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground/50 border border-dashed border-border/50 rounded-2xl p-4">
                              No reflection was saved for this session.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
