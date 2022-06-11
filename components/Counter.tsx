import { FormEvent, useReducer } from 'react'

function Counter() {
  const [count, handleSubmit] = useReducer((state: number, e: FormEvent) => {
    e.preventDefault()
    return state + 1
  }, 0)
  return (
    <form onSubmit={handleSubmit} className="grid">
      <input type="number" name="count" value={count} readOnly />
      <button type="submit">Count</button>
    </form>
  )
}

export default Counter
