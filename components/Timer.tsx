import {
  DispatchWithoutAction,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'

const INITIAL_DURATION = 30_000
const MAX_DURATION = 60_000

function useElapsedTime(
  duration: number
): [time: number, reset: DispatchWithoutAction] {
  const [time, dispatch] = useReducer((t: number, dt: number | null) => {
    if (dt === null) {
      return 0
    }
    // Referencing duration technically makes this reducer impure, but it feels
    // slightly clearer to do it this way than use a ref.
    return Math.min(t + dt, duration)
  }, 0)

  useEffect(() => {
    let prev = performance.now()
    let handle = requestAnimationFrame(function cb(curr) {
      // Guarantee that time is monotonic; the time given by performance.now()
      // may be slightly later than the timestamp cb() is first invoked with.
      const delta = Math.max(curr - prev, 0)

      dispatch(delta)

      prev = curr
      handle = requestAnimationFrame(cb)
    })
    return () => cancelAnimationFrame(handle)
  }, [])

  return [time, useCallback(() => dispatch(null), [])]
}

function Time(props: { value: number }) {
  return <time>{(props.value / 1000).toFixed(1)}s</time>
}

function Timer() {
  const [duration, setDuration] = useState(INITIAL_DURATION)
  const [time, reset] = useElapsedTime(duration)

  return (
    <form onReset={reset}>
      <label>
        Elapsed Time
        <progress value={time} max={duration} />
        <Time value={time} />
      </label>
      <label>
        Duration
        <input
          type="range"
          value={duration}
          max={MAX_DURATION}
          data-tooltip={`${(duration / 1000).toFixed(1)}s`}
          onChange={(e) => setDuration(e.currentTarget.valueAsNumber)}
        />
      </label>
      <button type="reset" className="secondary outline">
        Reset
      </button>
    </form>
  )
}

export default Timer
