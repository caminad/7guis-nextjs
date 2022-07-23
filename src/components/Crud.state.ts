import type { Action } from '../lib/state'
import { Person } from './Crud.model'

export interface State {
  readonly nextId: number
  readonly people: readonly Person[]
  readonly draft: Person
}
export function State(): State {
  return {
    nextId: 1,
    people: [],
    draft: Person(),
  }
}

export function reducer(
  state: State,
  action:
    | Action<'create' | 'update' | 'delete'>
    | Action<'select', Person | null>
    | Action<'givenName' | 'familyName', string>
): State {
  switch (action.type) {
    case 'create': {
      const person = { ...state.draft, _id: state.nextId }
      return {
        nextId: state.nextId + 1,
        people: state.people.concat(person),
        draft: person,
      }
    }
    case 'update':
      return {
        ...state,
        people: state.people.map((person) => {
          if (person._id !== state.draft._id) {
            return person
          }
          return state.draft
        }),
      }
    case 'delete':
      return {
        ...state,
        people: state.people.filter((person) => {
          return person._id !== state.draft._id
        }),
      }
    case 'select':
      return {
        ...state,
        draft: action.payload ?? Person(),
      }
    case 'givenName':
      return {
        ...state,
        draft: { ...state.draft, givenName: action.payload },
      }
    case 'familyName':
      return {
        ...state,
        draft: { ...state.draft, familyName: action.payload },
      }
    default:
      return state
  }
}
