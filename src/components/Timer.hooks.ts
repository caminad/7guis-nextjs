import { useEffect, useRef } from 'react'

export function useAnimationEffect(effect: (delta: number) => void) {
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
