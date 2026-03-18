import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { callMyStudyTipsFunction } from "@/lib/firebase";
import { getSessions } from "@/storage/session";


// Fetch study tips
export function ReflectionTips() {
    const [tips, setTips] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTips() {
            try {
                setLoading(true);
                const allSessions = await getSessions();

                // Get the top 7 most recent sessions to give to the LLM
                // Sort by time descending
                const sorted = [...allSessions].sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());
                const recentSessions = sorted.slice(0, 7);

                if (recentSessions.length === 0) {
                    setTips("No recent study sessions to generate tips.");
                    return;
                }

                const result = await callMyStudyTipsFunction(recentSessions);

                if (!result) {
                    setTips(null);
                    return;
                }

                // Depending on how getStudyTips callable is implemented, the response might be in result.data
                let tipsText = null;
                if (typeof result === 'string') {
                    tipsText = result;
                } else if (result.data && typeof result.data === 'string') {
                    tipsText = result.data;
                } else if (result.data && typeof result.data.tips === 'string') {
                    tipsText = result.data.tips;
                } else if (result.data && typeof result.data.message === 'string') {
                    tipsText = result.data.message;
                }

                setTips(tipsText);
            } catch (error) {
                console.error("Failed to fetch tips:", error);
                setTips(null);
            } finally {
                setLoading(false);
            }
        }

        fetchTips();
    }, []);

    return (
        <Card className="rounded-3xl">
            <CardHeader>
                <CardTitle>Reflection</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {loading ? (
                        "Loading tips..."
                    ) : tips ? (
                        tips
                    ) : (
                        "No tips for today!"
                    )}
                </p>
            </CardContent>
        </Card>
    );
}
