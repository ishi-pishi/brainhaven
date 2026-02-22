
/**
 *  Interface for making queries on all of user's subjects.
 */
export type Query = {
  subjectsIds?: string[];      // multiple subjects, optional
  start?: string;           // ISO date/time (inclusive)
  end?: string;             // ISO date/time (exclusive)

  groupBy?: "none" | "day" | "week" | "subject" | "weekday";
  metric?: "total" | "average" | "count";
}

// Converts string object to query
export function stringToQuery(str: string) {
    return JSON.parse(str);
}

// Converts query into string format
export function queryToString(query: Query) {
    return JSON.stringify(query)
} 