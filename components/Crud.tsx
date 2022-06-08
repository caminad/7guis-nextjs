import { useEffect, useMemo, useReducer, useRef, useState } from 'react'

const initialState: readonly string[] = [
  'Emil, Hans',
  'Mustermann, Max',
  'Tisch, Roman',
]

function reducer(
  state: readonly string[],
  [type, data]: [type: 'create' | 'update' | 'delete', data: FormData]
) {
  if (type === 'update' || type === 'delete') {
    const selected = data.get('selected')
    if (selected) {
      state = state.filter((x) => x !== selected)
    }
  }
  if (type === 'create' || type === 'update') {
    const name = [data.get('surname'), data.get('name')]
      .filter(Boolean)
      .join(', ')
    if (name) {
      state = [...new Set(state).add(name)]
    }
  }
  return state
}

export default function Crud() {
  const [names, dispatch] = useReducer(reducer, initialState)
  const [filter, setFilter] = useState('')
  const [hasSelection, setHasSelection] = useState(false)

  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (ref.current) {
      const data = new FormData(ref.current)
      setHasSelection(data.has('selected'))
    }
  }, [filter, names])

  const filteredNames = useMemo(() => {
    return Array.from(names)
      .filter((n) => n.toLowerCase().startsWith(filter))
      .sort()
  }, [filter, names])

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
        dispatch(['create', data])
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
            if (e.currentTarget.form?.reportValidity()) {
              const data = new FormData(e.currentTarget.form)
              dispatch(['update', data])
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
            if (e.currentTarget.form) {
              const data = new FormData(e.currentTarget.form)
              dispatch(['delete', data])
            }
          }}
          className="contrast outline"
        >
          Delete
        </button>
      </div>
    </form>
  )
}
