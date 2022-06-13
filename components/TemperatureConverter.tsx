import { useState } from 'react'
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from './TemperatureConverter/utils'

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('')
  const [fahrenheit, setFahrenheit] = useState('')

  return (
    <form className="grid">
      <label>
        Celsius
        <input
          type="number"
          inputMode="decimal"
          placeholder="Temperature in °C"
          value={celsius}
          onChange={(e) => {
            const celsius = e.currentTarget.value
            setCelsius(celsius)
            setFahrenheit(celsiusToFahrenheit(celsius))
          }}
        />
      </label>
      <label>
        Fahrenheit
        <input
          type="number"
          inputMode="decimal"
          placeholder="Temperature in °F"
          value={fahrenheit}
          onChange={(e) => {
            const fahrenheit = e.currentTarget.value
            setFahrenheit(fahrenheit)
            setCelsius(fahrenheitToCelsius(fahrenheit))
          }}
        />
      </label>
    </form>
  )
}
