import { useState } from 'react'
import { DurationInput, TimeProgress } from './Timer/components'
import { useAnimationEffect } from './Timer/hooks'

export default function Timer({
  initialDuration = 30_000,
  maxDuration = 60_000,
}: {
  initialDuration?: number
  maxDuration?: number
}) {
  const [duration, setDuration] = useState(initialDuration)
  const [time, setTime] = useState(0)

  useAnimationEffect((delta) => {
    setTime((t) => Math.min(t + delta, duration))
  })

  return (
    <form onReset={() => setTime(0)}>
      <label>
        Elapsed Time
        <TimeProgress max={duration} value={time} />
      </label>
      <label>
        Duration
        <DurationInput
          max={maxDuration}
          value={duration}
          onChange={setDuration}
        />
      </label>
      <button type="reset" className="secondary outline">
        Reset
      </button>
    </form>
  )
}
