import type { Dispatch } from 'react'
import { toISODateString } from './model'

interface SwitchInputProps {
  readonly defaultChecked: boolean
  readonly onChange: Dispatch<boolean>
}
export function SwitchInput(props: SwitchInputProps) {
  return (
    <input
      type="checkbox"
      role="switch"
      defaultChecked={props.defaultChecked}
      onChange={(e) => props.onChange(e.currentTarget.checked)}
    />
  )
}

interface DateInputProps {
  readonly name: string
  readonly disabled?: boolean
  readonly min: Date
  readonly max: Date
  readonly value: Date
  readonly onChange: Dispatch<Date>
}
export function DateInput(props: DateInputProps) {
  return (
    <input
      type="date"
      required
      name={props.name}
      disabled={props.disabled}
      min={toISODateString(props.min)}
      max={toISODateString(props.max)}
      value={toISODateString(props.value)}
      onChange={(e) => {
        const value = e.currentTarget.valueAsDate
        if (value) props.onChange(value)
      }}
    />
  )
}
