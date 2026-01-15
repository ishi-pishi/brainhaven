export type StudySession = {
  subjectId: string
  startTime: string
  endTime: string
  workBlockMs: number
  breakBlockMs: number
  intendedCycles?: number
  productivityRating?: number
  reflections?: string
  earnedCurrency: number
}
