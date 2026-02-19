export type FinishedTimer = {
  subjectId: string
  startTime: string
  endTime: string
  workBlockMs: number
  breakBlockMs: number
  intendedCycles?: number
}

export type StudySession = {
  timer: FinishedTimer
  productivityRating?: number
  reflections?: string
  earnedCurrency: number
}
