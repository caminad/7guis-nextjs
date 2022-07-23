import type { Action } from '../lib/state'
import type { Circle } from './CircleDrawer.model'

export interface State {
  readonly circles: readonly Circle[]
  readonly undo: readonly Circle[]
}
export function State(): State {
  return {
    circles: [],
    undo: [],
  }
}

export function reducer(
  state: State,
  action: Action<'add', Circle> | Action<'undo' | 'redo'>
): State {
  switch (action.type) {
    case 'add':
      return {
        circles: state.circles.concat(action.payload),
        undo: [],
      }
    case 'undo':
      return {
        circles: state.circles.slice(0, -1),
        undo: state.undo.concat(state.circles.slice(-1)),
      }
    case 'redo':
      return {
        circles: state.circles.concat(state.undo.slice(-1)),
        undo: state.undo.slice(0, -1),
      }
    default:
      return state
  }
}
