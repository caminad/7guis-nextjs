import type { Dispatch } from 'react'

interface TemperatureInputProps {
  readonly placeholder: string
  readonly value: string
  readonly onChange: Dispatch<string>
}
export function TemperatureInput(props: TemperatureInputProps) {
  return (
    <input
      type="number"
      inputMode="decimal"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.currentTarget.value)}
    />
  )
}
