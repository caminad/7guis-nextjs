import type { Dispatch } from 'react'

export function TemperatureInput(props: {
  placeholder: string
  value: string
  onChange: Dispatch<string>
}) {
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
