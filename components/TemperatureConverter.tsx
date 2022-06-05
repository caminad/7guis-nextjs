import { useId, useState } from 'react'

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
  const id = useId()
  const temperature = useTemperature()
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
      <input
        type="number"
        id={'celsius' + id}
        name="celsius"
        value={Number.isFinite(temperature.C) ? temperature.C : ''}
        onChange={(e) => temperature.setC(e.currentTarget.valueAsNumber)}
        className="min-w-0 border px-1"
      />
      <label htmlFor={'celsius' + id}>Celsius</label>
      <span>{'='}</span>
      <input
        type="number"
        id={'fahrenheit' + id}
        name="F"
        value={Number.isFinite(temperature.F) ? temperature.F : ''}
        onChange={(e) => temperature.setF(e.currentTarget.valueAsNumber)}
        className="min-w-0 border px-1"
      />
      <label htmlFor={'fahrenheit' + id}>Fahrenheit</label>
    </form>
  )
}

export default TemperatureConverter
