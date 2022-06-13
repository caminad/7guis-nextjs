import type { Dispatch, DispatchWithoutAction } from 'react'
import styles from './components.module.css'
import { Circle, deduplicateCircles, growCircle } from './models'

interface UndoButtonProps {
  readonly disabled: boolean
  readonly onUndo: DispatchWithoutAction
}
export function UndoButton(props: UndoButtonProps) {
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
interface RedoButtonProps {
  readonly disabled: boolean
  readonly onRedo: DispatchWithoutAction
}
export function RedoButton(props: RedoButtonProps) {
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

interface CanvasProps {
  readonly circles: readonly Circle[]
  readonly onAdd: Dispatch<Circle>
}
export function Canvas(props: CanvasProps) {
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
