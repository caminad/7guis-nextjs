import { useState } from 'react'

function round(value: number) {
  return Math.round((value + Number.EPSILON) * 1000) / 1000
}

function useTemperature() {
  const [state, setState] = useState(NaN)
  return {
    C: round(state),
    setC: (value: number) => setState(value),
    F: round(state * (9 / 5) + 32),
    setF: (value: number) => setState((value - 32) * (5 / 9)),
  }
}

function TemperatureConverter() {
  const temperature = useTemperature()
  return (
    <div className="grid">
      <label>
        Celsius
        <input
          type="number"
          name="celsius"
          placeholder="Temperature in °C"
          value={Number.isFinite(temperature.C) ? temperature.C : ''}
          onChange={(e) => temperature.setC(e.currentTarget.valueAsNumber)}
        />
      </label>
      <label>
        Fahrenheit
        <input
          type="number"
          name="fahrenheit"
          placeholder="Temperature in °F"
          value={Number.isFinite(temperature.F) ? temperature.F : ''}
          onChange={(e) => temperature.setF(e.currentTarget.valueAsNumber)}
        />
      </label>
    </div>
  )
}

export default TemperatureConverter
