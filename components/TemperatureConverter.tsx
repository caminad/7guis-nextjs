import { Big } from 'big.js'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

function useTemperature() {
  const [celsius, setCelsius] = useState<Big>()
  const fahrenheit = useMemo(() => celsius?.times(9).div(5).add(32), [celsius])
  const setFahrenheit: typeof setCelsius = useCallback((value) => {
    setCelsius((c) => {
      if (typeof value === 'function') value = value(c)
      return value?.minus(32).times(5).div(9)
    })
  }, [])
  return { celsius, setCelsius, fahrenheit, setFahrenheit } as const
}

function tryBig(value: string) {
  try {
    return new Big(value)
  } catch {
    // ignore
  }
}

function TemperatureInput(props: {
  name: string
  placeholder: string
  value: Big | undefined
  onChange: Dispatch<SetStateAction<Big | undefined>>
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      name={props.name}
      placeholder={props.placeholder}
      value={props.value?.round(15).toString() ?? ''}
      onChange={(e) => props.onChange(tryBig(e.currentTarget.value))}
    />
  )
}

function TemperatureConverter() {
  const { celsius, setCelsius, fahrenheit, setFahrenheit } = useTemperature()
  return (
    <form className="grid">
      <label>
        Celsius
        <TemperatureInput
          name="celsius"
          placeholder="Temperature in °C"
          value={celsius}
          onChange={setCelsius}
        />
      </label>
      <label>
        Fahrenheit
        <TemperatureInput
          name="fahrenheit"
          placeholder="Temperature in °F"
          value={fahrenheit}
          onChange={setFahrenheit}
        />
      </label>
    </form>
  )
}

export default TemperatureConverter
