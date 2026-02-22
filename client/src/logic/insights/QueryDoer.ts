import type { Query } from "./Query";
import { getSessions, type StudySession } from "../storage/session";

import { stringToQuery } from "./Query";

export async function execute(queryString: string): Promise<StudySession[]> {
    const query = stringToQuery(queryString);
    const allSessions = await getSessions();
    return executeQuery(query, allSessions);
}

// Executes a query on a list of sessions
function executeQuery(query: Query, sessions: StudySession[]): StudySession[] {
    let filtered = sessions;
    if (query.subjectsIds && query.subjectsIds.length > 0) {
        filtered = filtered.filter(s => query.subjectsIds!.includes(s.subjectId));
    }
    if (query.start) {
        filtered = filtered.filter(s => new Date(s.startTime) >= new Date(query.start!));
    }
    if (query.end) {
        filtered = filtered.filter(s => new Date(s.endTime) < new Date(query.end!));
    }
    switch (query.groupBy) {
        case "day":
            return filtered.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        case "week":
            return filtered.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        case "weekday":
            return filtered.sort((a, b) => new Date(a.startTime).getDay() - new Date(b.startTime).getDay());
        case "subject":
            return filtered.sort((a, b) => a.subjectId.localeCompare(b.subjectId));
        default:
            return filtered;
    }
}