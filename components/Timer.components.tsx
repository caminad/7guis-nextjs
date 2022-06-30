import type { Dispatch } from 'react'
import { DEFAULT_MAX_DURATION } from './Timer.model'

const nf = new Intl.NumberFormat(undefined, {
  style: 'unit',
  unit: 'second',
  unitDisplay: 'narrow',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

interface DurationInputProps {
  readonly value: number
  readonly max: number | undefined
  readonly onChange: Dispatch<number>
}
export function DurationInput(props: DurationInputProps) {
  return (
    <input
      type="range"
      value={props.value}
      max={props.max ?? DEFAULT_MAX_DURATION}
      data-tooltip={nf.format(props.value / 1000)}
      onChange={(e) => props.onChange(e.currentTarget.valueAsNumber)}
      className="tabular-nums"
    />
  )
}

interface TimeProgressProps {
  readonly value: number
  readonly max: number
}
export function TimeProgress(props: TimeProgressProps) {
  return (
    <fieldset className="tabular-nums">
      <progress value={props.value} max={props.max} />
      <time>{nf.format(props.value / 1000)}</time>
    </fieldset>
  )
}
