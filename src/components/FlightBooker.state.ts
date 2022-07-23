import type { Action } from '../lib/state'
import { addYears, clampDate } from './FlightBooker.model'

export interface FlightBookerState {
  readonly min: Date
  readonly max: Date
  readonly start: Date
  readonly return: Date
  readonly returnEnabled: boolean
  readonly message: string
}
export function FlightBookerState(): FlightBookerState {
  const today = new Date()
  return {
    min: today,
    max: addYears(today, 10),
    start: today,
    return: today,
    returnEnabled: false,
    message: '',
  }
}

export function flightBookerReducer(
  state: FlightBookerState,
  action:
    | Action<'start_date_changed' | 'return_date_changed', Date>
    | Action<'return_date_toggled', boolean>
    | Action<'booking_processed', { message: string }>
): FlightBookerState {
  switch (action.type) {
    case 'start_date_changed':
      return {
        ...state,
        start: clampDate(action.payload, state),
        return: state.returnEnabled
          ? clampDate(state.return, { min: action.payload, max: state.max })
          : state.return,
        message: '',
      }
    case 'return_date_changed':
      return {
        ...state,
        start: clampDate(state.start, { min: state.min, max: action.payload }),
        return: clampDate(action.payload, state),
        message: '',
      }
    case 'return_date_toggled':
      return {
        ...state,
        return: action.payload
          ? clampDate(state.return, { min: state.start, max: state.max })
          : state.return,
        returnEnabled: action.payload,
        message: '',
      }
    case 'booking_processed':
      return {
        ...state,
        message: action.payload.message,
      }
    default:
      return state
  }
}
