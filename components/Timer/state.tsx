import type { Action } from '../../lib/action'
import { DEFAULT_INITIAL_DURATION } from './constants'

interface State {
  readonly time: number
  readonly duration: number
}
export function init(duration = DEFAULT_INITIAL_DURATION): State {
  return { time: 0, duration }
}

export function reducer(
  state: State,
  action: Action<'time' | 'duration', number> | Action<'reset'>
): State {
  switch (action.type) {
    case 'time':
      return { ...state, time: action.payload }
    case 'duration':
      return { ...state, duration: action.payload }
    case 'reset':
      return init(state.duration)
    default:
      return state
  }
}
