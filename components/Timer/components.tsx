import type { Dispatch } from 'react'

const nf = new Intl.NumberFormat(undefined, {
  style: 'unit',
  unit: 'second',
  unitDisplay: 'narrow',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function DurationInput(props: {
  value: number
  max: number
  onChange: Dispatch<number>
}) {
  return (
    <input
      type="range"
      value={props.value}
      max={props.max}
      data-tooltip={nf.format(props.value / 1000)}
      onChange={(e) => props.onChange(e.currentTarget.valueAsNumber)}
      className="tabular-nums"
    />
  )
}

export function TimeProgress(props: { value: number; max: number }) {
  return (
    <fieldset className="tabular-nums">
      <progress value={props.value} max={props.max} />
      <time>{nf.format(props.value / 1000)}</time>
    </fieldset>
  )
}
