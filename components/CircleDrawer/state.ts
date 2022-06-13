import type { Action, ActionWithoutPayload } from '../../lib/action'
import type { Circle } from './models'

interface State {
  readonly circles: readonly Circle[]
  readonly undo: readonly Circle[]
}
export const initialState: State = { circles: [], undo: [] }

export function reducer(
  state: State,
  action: Action<'add', Circle> | ActionWithoutPayload<'undo' | 'redo'>
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
