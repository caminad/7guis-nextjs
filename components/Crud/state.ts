import type { Action } from '../../lib/action'

export interface State {
  readonly names: readonly string[]
}
export function State(names: Iterable<string> = []): State {
  return {
    names: Array.from(names),
  }
}

export function reducer(
  state: State,
  action: Action<'create' | 'update' | 'delete', FormData>
): State {
  if (action.type === 'update' || action.type === 'delete') {
    const selected = action.payload.get('selected')
    if (selected) {
      state = { names: state.names.filter((x) => x !== selected) }
    }
  }
  if (action.type === 'create' || action.type === 'update') {
    const name = [action.payload.get('surname'), action.payload.get('name')]
      .filter(Boolean)
      .join(', ')
    if (name) {
      state = { names: [...new Set(state.names).add(name)] }
    }
  }
  return state
}
