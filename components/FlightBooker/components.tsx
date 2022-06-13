import { Dispatch, useEffect, useRef, useState } from 'react'

export function SwitchInput(props: {
  defaultChecked: boolean
  onChange: Dispatch<boolean>
}) {
  return (
    <input
      type="checkbox"
      role="switch"
      defaultChecked={props.defaultChecked}
      onChange={(e) => props.onChange(e.currentTarget.checked)}
    />
  )
}
export function DateInput(props: {
  name: string
  disabled?: boolean
  min: string
  value: string
  onChange: Dispatch<string>
}) {
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
