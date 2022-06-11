import { useEffect, useRef, useState } from 'react'

const nf = new Intl.NumberFormat(undefined, {
  style: 'unit',
  unit: 'second',
  unitDisplay: 'narrow',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

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

function Timer({ initialDuration = 30_000, maxDuration = 60_000 }) {
  const [duration, setDuration] = useState(initialDuration)
  const [time, setTime] = useState(0)

  useAnimationEffect((delta) => {
    setTime((t) => Math.min(t + delta, duration))
  })

  return (
    <form onReset={() => setTime(0)}>
      <label>
        Elapsed Time
        <progress value={time} max={duration} />
        <time>{nf.format(time / 1000)}</time>
      </label>
      <label>
        Duration
        <input
          type="range"
          value={duration}
          max={maxDuration}
          data-tooltip={nf.format(duration / 1000)}
          onChange={(e) => setDuration(e.currentTarget.valueAsNumber)}
        />
      </label>
      <button type="reset" className="secondary outline">
        Reset
      </button>

      <style jsx>{`
        form {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </form>
  )
}

export default Timer
