import { Dispatch, useEffect, useRef, useState } from 'react'

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
  readonly min: string
  readonly value: string
  readonly onChange: Dispatch<string>
}
export function DateInput(props: DateInputProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [invalid, setInvalid] = useState<boolean>()

  useEffect(() => {
    setInvalid(!ref.current!.checkValidity())
  }, [props.min, props.value])

  return (
    <input
      ref={ref}
      type="date"
      required
      aria-invalid={invalid ? 'true' : undefined}
      name={props.name}
      disabled={props.disabled}
      min={props.min}
      value={props.value}
      onChange={(e) => props.onChange(e.currentTarget.value)}
      onInvalid={() => setInvalid(true)}
    />
  )
}
