import { useReducer, useState } from 'react'
import { Action } from '../lib/state'
import { Person } from './Crud.model'
import { reducer, State } from './Crud.state'

export default function Crud() {
  const [state, dispatch] = useReducer(reducer, undefined, State)
  const [filter, setFilter] = useState('')

  const isUpdate = state.people.some((p) => p._id === state.draft._id)

  const filteredPeople = state.people
    .filter((p) => Person.test(p, filter))
    .sort(Person.cmp)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (isUpdate) {
          dispatch(Action('update'))
        } else {
          dispatch(Action('create'))
        }
      }}
    >
      <div className="grid">
        <label>
          Filter prefix
          <input
            type="search"
            value={filter}
            onChange={(e) => {
              setFilter(e.currentTarget.value.toLocaleLowerCase())
            }}
          />
        </label>
        <div />
      </div>
      <div className="grid">
        <fieldset>
          {filteredPeople.map((person) => (
            <label key={person._id}>
              <input
                type="checkbox"
                name="selected"
                value={person._id}
                checked={state.draft._id === person._id}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    dispatch(Action('select', person))
                  } else {
                    dispatch(Action('select', null))
                  }
                }}
              />{' '}
              {person.familyName}, {person.givenName}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <label>
            Given name
            <input
              type="text"
              name="givenName"
              value={state.draft.givenName}
              onChange={(e) => {
                dispatch(Action('givenName', e.currentTarget.value))
              }}
              required
            />
          </label>
          <label>
            Family name
            <input
              type="text"
              name="familyName"
              value={state.draft.familyName}
              onChange={(e) => {
                dispatch(Action('familyName', e.currentTarget.value))
              }}
            />
          </label>
        </fieldset>
      </div>
      <div className="grid">
        <button type="submit">{isUpdate ? 'Update' : 'Create'}</button>
        <button
          type="button"
          disabled={!isUpdate}
          onClick={() => {
            dispatch(Action('delete'))
            setFilter('')
          }}
          className="contrast outline"
        >
          Delete
        </button>
      </div>
    </form>
  )
}
