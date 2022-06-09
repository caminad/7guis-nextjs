import { Big } from 'big.js'
import { useState } from 'react'

function tryBig(value: string) {
  try {
    return new Big(value)
  } catch {
    // ignore
  }
}

function fahrenheitToCelsius(fahrenheit: string) {
  return tryBig(fahrenheit)?.minus(32).times(5).div(9).toString() ?? ''
}

function celsiusToFahrenheit(celsius: string) {
  return tryBig(celsius)?.times(9).div(5).plus(32).toString() ?? ''
}

function TemperatureConverter() {
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

export default TemperatureConverter
