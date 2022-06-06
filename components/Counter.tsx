import { useReducer } from 'react'

function Counter() {
  const [value, count] = useReducer((n: number) => n + 1, 0)

  return (
    <div className="grid">
      <input readOnly value={value} />
      <button type="button" onClick={count}>
        Count
      </button>
    </div>
  )
}

export default Counter
