import type { Action } from '../../lib/action'
import { addYears, clampDate } from './models'

interface State {
  readonly min: Date
  readonly max: Date
  readonly start: Date
  readonly return: Date
  readonly returnEnabled: boolean
}
export function init(today = new Date()): State {
  return {
    min: addYears(today, -1),
    max: addYears(today, 10),
    start: today,
    return: today,
    returnEnabled: false,
  }
}

function fixStart(state: State): State {
  const limits = { min: state.min, max: state.return }
  return { ...state, start: clampDate(state.start, limits) }
}

function fixReturn(state: State): State {
  if (!state.returnEnabled) {
    // Return field is disabled so an invalid date won't break the form.
    return state
  }
  const limits = { min: state.start, max: state.max }
  return { ...state, return: clampDate(state.return, limits) }
}

export function reducer(
  state: State,
  action: Action<'start' | 'return', Date> | Action<'enable_return', boolean>
): State {
  console.log(state, action)
  switch (action.type) {
    case 'start':
      return fixReturn({ ...state, start: clampDate(action.payload, state) })
    case 'return':
      return fixStart({ ...state, return: clampDate(action.payload, state) })
    case 'enable_return':
      return fixReturn({ ...state, returnEnabled: action.payload })
    default:
      return state
  }
}
