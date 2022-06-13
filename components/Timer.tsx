import { useState } from 'react'
import { DurationInput, TimeProgress } from './Timer/components'
import { useAnimationEffect } from './Timer/hooks'

const DEFAULT_INITIAL_DURATION = 30_000
const DEFAULT_MAX_DURATION = 60_000

interface TimerProps {
  readonly initialDuration?: number
  readonly maxDuration?: number
}
export default function Timer(props: TimerProps) {
  const [duration, setDuration] = useState(
    props.initialDuration ?? DEFAULT_INITIAL_DURATION
  )
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
          max={props.maxDuration ?? DEFAULT_MAX_DURATION}
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
