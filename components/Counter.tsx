import { FormEventHandler, useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setCount((c) => c + 1)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
      <output className="border px-1">{count}</output>
      <button type="submit" className="rounded border px-2">
        Count
      </button>
    </form>
  )
}

export default Counter
