import { useReducer } from 'react'
import { Action } from '../lib/action'
import { DurationInput, TimeProgress } from './Timer/components'
import { useAnimationEffect } from './Timer/hooks'
import { init, reducer } from './Timer/state'

interface TimerProps {
  readonly initialDuration?: number
  readonly maxDuration?: number
}
export default function Timer(props: TimerProps) {
  const [state, dispatch] = useReducer(reducer, props.initialDuration, init)

  useAnimationEffect((delta) => dispatch(Action('add_time', delta)))

  return (
    <form onReset={() => dispatch(Action('reset'))}>
      <label>
        Elapsed Time
        <TimeProgress max={state.duration} value={state.time} />
      </label>
      <label>
        Duration
        <DurationInput
          max={props.maxDuration}
          value={state.duration}
          onChange={(value) => dispatch(Action('duration', value))}
        />
      </label>
      <button type="reset" className="secondary outline">
        Reset
      </button>
    </form>
  )
}
