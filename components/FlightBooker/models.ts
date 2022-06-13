export function clampDate(value: Date, limits: { min: Date; max: Date }): Date {
  return new Date(
    Math.max(
      limits.min.getTime(),
      Math.min(limits.max.getTime(), value.getTime())
    )
  )
}

export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date)
  newDate.setFullYear(date.getFullYear() + years)
  return newDate
}

export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0]
}
