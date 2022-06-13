const DEFAULT_R = 10

export interface Circle {
  readonly key: string
  readonly cx: number
  readonly cy: number
  readonly r: number
}
export function Circle(cx: number, cy: number, r = DEFAULT_R): Circle {
  return { key: `${cx},${cy}`, cx, cy, r }
}

export function growCircle(circle: Circle, dr: number): Circle {
  return { ...circle, r: circle.r + dr }
}

export function deduplicateCircles(circles: readonly Circle[]): Circle[] {
  const m = new Map<string, Circle>()
  for (const c of circles) {
    m.set(c.key, c)
  }
  return Array.from(m.values())
}
