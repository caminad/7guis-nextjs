import type { Action } from '../../lib/action'

type State = readonly string[]
export const initialState: State = [
  'Emil, Hans',
  'Mustermann, Max',
  'Tisch, Roman',
]

export function reducer(
  state: State,
  action: Action<'create' | 'update' | 'delete', FormData>
): State {
  if (action.type === 'update' || action.type === 'delete') {
    const selected = action.payload.get('selected')
    if (selected) {
      state = state.filter((x) => x !== selected)
    }
  }
  if (action.type === 'create' || action.type === 'update') {
    const name = [action.payload.get('surname'), action.payload.get('name')]
      .filter(Boolean)
      .join(', ')
    if (name) {
      state = [...new Set(state).add(name)]
    }
  }
  return state
}
