import type { Action } from '../../lib/action'
import { celsiusToFahrenheit, fahrenheitToCelsius } from './models'

interface State {
  readonly celsius: string
  readonly fahrenheit: string
}
export const initialState: State = {
  celsius: '',
  fahrenheit: '',
}

export function reducer(
  state: State,
  action: Action<'celsius' | 'fahrenheit', string>
): State {
  switch (action.type) {
    case 'celsius':
      return {
        celsius: action.payload,
        fahrenheit: celsiusToFahrenheit(action.payload),
      }
    case 'fahrenheit':
      return {
        celsius: fahrenheitToCelsius(action.payload),
        fahrenheit: action.payload,
      }
    default:
      return state
  }
}
