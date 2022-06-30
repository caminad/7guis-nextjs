import { useEffect, useReducer, useRef, useState } from 'react'
import { Action } from '../lib/state'
import { reducer, State } from './Crud.state'

export default function Crud() {
  const [state, dispatch] = useReducer(reducer, undefined, State)
  const [filter, setFilter] = useState('')
  const [hasSelection, setHasSelection] = useState(false)

  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const data = new FormData(ref.current!)
    setHasSelection(data.has('selected'))
  }, [filter, state])

  const filteredNames = Array.from(state.names)
    .filter((n) => n.toLowerCase().startsWith(filter))
    .sort()

  return (
    <form
      ref={ref}
      onChange={(e) => {
        const data = new FormData(e.currentTarget)
        setHasSelection(data.has('selected'))
      }}
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        dispatch(Action('create', data))
      }}
    >
      <div className="grid">
        <label>
          Filter prefix
          <input
            type="search"
            value={filter}
            onChange={(e) => {
              setFilter(e.currentTarget.value.toLowerCase())
            }}
          />
        </label>
        <div />
      </div>
      <div className="grid">
        <fieldset>
          {filteredNames.map((name) => (
            <label key={name}>
              <input type="radio" name="selected" value={name} /> {name}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Surname
            <input type="text" name="surname" />
          </label>
        </fieldset>
      </div>
      <div className="grid">
        <button type="submit">Create</button>
        <button
          type="button"
          disabled={!hasSelection}
          onClick={(e) => {
            if (e.currentTarget.form!.reportValidity()) {
              const data = new FormData(e.currentTarget.form!)
              dispatch(Action('update', data))
            }
          }}
          className="outline"
        >
          Update
        </button>
        <button
          type="button"
          disabled={!hasSelection}
          onClick={(e) => {
            const data = new FormData(e.currentTarget.form!)
            dispatch(Action('delete', data))
          }}
          className="contrast outline"
        >
          Delete
        </button>
      </div>
    </form>
  )
}
