import type { Action } from '../../lib/action'
import { DEFAULT_INITIAL_DURATION } from './model'

export interface State {
  readonly time: number
  readonly duration: number
}
export function State(duration = DEFAULT_INITIAL_DURATION): State {
  return {
    time: 0,
    duration,
  }
}

function fixTime(state: State): State {
  return { ...state, time: Math.min(state.time, state.duration) }
}

export function reducer(
  state: State,
  action: Action<'add_time' | 'duration', number> | Action<'reset'>
): State {
  switch (action.type) {
    case 'add_time':
      if (state.time === state.duration) {
        // Bail early to avoid a rerender.
        return state
      }
      return fixTime({ ...state, time: state.time + action.payload })
    case 'duration':
      return fixTime({ ...state, duration: action.payload })
    case 'reset':
      return State(state.duration)
    default:
      return state
  }
}
