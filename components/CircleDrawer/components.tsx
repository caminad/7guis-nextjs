import type { Dispatch, DispatchWithoutAction } from 'react'
import styles from './components.module.css'
import { Circle, deduplicateCircles, growCircle } from './models'

export function UndoButton(props: {
  disabled: boolean
  onUndo: DispatchWithoutAction
}) {
  return (
    <button
      type="button"
      disabled={props.disabled}
      onClick={props.onUndo}
      className="secondary"
    >
      Undo
    </button>
  )
}
export function RedoButton(props: {
  disabled: boolean
  onRedo: DispatchWithoutAction
}) {
  return (
    <button
      type="button"
      disabled={props.disabled}
      onClick={props.onRedo}
      className="secondary"
    >
      Redo
    </button>
  )
}

export function Canvas(props: {
  circles: readonly Circle[]
  onAdd: Dispatch<Circle>
}) {
  return (
    <svg
      width="100%"
      height="100%"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        props.onAdd(Circle(e.clientX - rect.x, e.clientY - rect.y))
      }}
      className={styles.Canvas}
    >
      {deduplicateCircles(props.circles).map((circle) => (
        <circle
          key={circle.key}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          onContextMenu={(e) => {
            e.preventDefault()
            props.onAdd(growCircle(circle, 1))
          }}
        />
      ))}
    </svg>
  )
}
