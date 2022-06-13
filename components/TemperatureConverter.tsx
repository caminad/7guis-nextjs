import { useReducer } from 'react'
import { Action } from '../lib/action'
import { TemperatureInput } from './TemperatureConverter/components'
import { initialState, reducer } from './TemperatureConverter/state'

export default function TemperatureConverter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <form className="grid">
      <label>
        Celsius
        <TemperatureInput
          placeholder="Temperature in °C"
          value={state.celsius}
          onChange={(value) => dispatch(Action('celsius', value))}
        />
      </label>
      <label>
        Fahrenheit
        <TemperatureInput
          placeholder="Temperature in °F"
          value={state.fahrenheit}
          onChange={(value) => dispatch(Action('fahrenheit', value))}
        />
      </label>
    </form>
  )
}
