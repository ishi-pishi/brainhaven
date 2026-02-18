import { EndSessionCard } from "@/components/EndSession/EndSessionCard";

/**
 *  This represents the page that appears after a user completes a study session.
 *  After completing the session, the user will choose a productivity rating and write 
 *  a little reflection about how they feel like their study session went.
 */
export function EndSessionPage() {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <EndSessionCard />
        </div>
    );
}