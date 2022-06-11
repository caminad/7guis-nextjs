import { useEffect, useRef, useState } from 'react'

const INITIAL_DURATION = 30_000
const MAX_DURATION = 60_000

function useAnimationEffect(effect: (delta: number) => void) {
  const effectRef = useRef(effect)
  useEffect(() => {
    effectRef.current = effect
  })
  useEffect(() => {
    let handle = requestAnimationFrame(function (t0) {
      handle = requestAnimationFrame(function cb(t1) {
        effectRef.current(t1 - t0)
        t0 = t1
        handle = requestAnimationFrame(cb)
      })
    })
    return () => cancelAnimationFrame(handle)
  }, [])
}

function Timer() {
  const [duration, setDuration] = useState(INITIAL_DURATION)
  const [time, setTime] = useState(0)

  useAnimationEffect((delta) => {
    setTime((t) => Math.min(t + delta, duration))
  })

  return (
    <form onReset={() => setTime(0)}>
      <label>
        Elapsed Time
        <progress value={time} max={duration} />
        <time>{(time / 1000).toFixed(1)}s</time>
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
