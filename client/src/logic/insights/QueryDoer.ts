import { getSessions, type StudySession } from "../../storage/session";

/**
 *  Interface for making queries on all of user's subjects.
 */
export type Query = {
  subjectsIds?: string[]; // multiple subjects, optional
  start?: string; // ISO date/time (inclusive)
  end?: string; // ISO date/time (exclusive)

  groupBy?: "none" | "day" | "week" | "subject" | "weekday";
  metric?: "total" | "average" | "count";
};

// Converts string object to query
export function stringToQuery(str: string) {
  return JSON.parse(str);
}

// Converts query into string format
export function queryToString(query: Query) {
  return JSON.stringify(query);
}

export async function executeQueryString(
  queryString: string,
): Promise<StudySession[]> {
  const query = stringToQuery(queryString);
  const allSessions = await getSessions();
  return executeQuery(query, allSessions);
}

// Executes a query on a list of sessions
function executeQuery(query: Query, sessions: StudySession[]): StudySession[] {
  let filtered = sessions;
  if (query.subjectsIds && query.subjectsIds.length > 0) {
    filtered = filtered.filter((s) => query.subjectsIds!.includes(s.subjectId));
  }
  if (query.start) {
    filtered = filtered.filter(
      (s) => new Date(s.startTime) >= new Date(query.start!),
    );
  }
  if (query.end) {
    filtered = filtered.filter(
      (s) => new Date(s.endTime) < new Date(query.end!),
    );
  }
  switch (query.groupBy) {
    case "day":
      return filtered.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
    case "week":
      return filtered.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
    case "weekday":
      return filtered.sort(
        (a, b) =>
          new Date(a.startTime).getDay() - new Date(b.startTime).getDay(),
      );
    case "subject":
      return filtered.sort((a, b) => a.subjectId.localeCompare(b.subjectId));
    default:
      return filtered;
  }
}
