import { FormEvent, useReducer } from 'react'

export default function Counter() {
  const [count, handleSubmit] = useReducer((state: number, e: FormEvent) => {
    e.preventDefault()
    return state + 1
  }, 0)
  return (
    <form onSubmit={handleSubmit} className="grid">
      <input type="number" value={count} readOnly aria-label="Count" />
      <button type="submit">Count</button>
    </form>
  )
}
