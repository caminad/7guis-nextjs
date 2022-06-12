import { Dispatch, DispatchWithoutAction, useReducer } from 'react'

export default function CircleDrawer() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <form>
      <div className="grid">
        <UndoButton
          disabled={state.circles.length === 0}
          onUndo={() => dispatch(undo())}
        />
        <RedoButton
          disabled={state.undo.length === 0}
          onRedo={() => dispatch(redo())}
        />
      </div>
      <Canvas
        circles={state.circles}
        onAdd={(circle) => dispatch(add(circle))}
      />
    </form>
  )
}

function UndoButton(props: {
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

function RedoButton(props: {
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

function Canvas(props: {
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
    >
      {deduplicate(props.circles).map((circle) => (
        <circle
          key={circle.key}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          onContextMenu={(e) => {
            e.preventDefault()
            props.onAdd(grow(circle, 1))
          }}
        />
      ))}

      <style jsx>{`
        svg {
          aspect-ratio: 2/1;
          color: var(--secondary);
          background-color: var(--secondary-inverse);
          border: 1px solid;
          cursor: crosshair;
        }

        circle {
          stroke: currentColor;
          fill: transparent;
        }

        circle:hover {
          fill: var(--primary-focus);
        }
      `}</style>
    </svg>
  )
}

interface State {
  readonly circles: readonly Circle[]
  readonly undo: readonly Circle[]
}
const initialState: State = { circles: [], undo: [] }

interface ActionWithoutPayload<Type extends string> {
  readonly type: Type
}
interface Action<Type extends string, Payload> {
  readonly type: Type
  readonly payload: Payload
}

function add(payload: Circle): Action<'add', Circle> {
  return { type: 'add', payload }
}
function undo(): ActionWithoutPayload<'undo'> {
  return { type: 'undo' }
}
function redo(): ActionWithoutPayload<'redo'> {
  return { type: 'redo' }
}

function reducer(
  state: State,
  action: ReturnType<typeof add | typeof undo | typeof redo>
): State {
  switch (action.type) {
    case 'add':
      return {
        circles: state.circles.concat(action.payload),
        undo: [],
      }
    case 'undo':
      return {
        circles: state.circles.slice(0, -1),
        undo: state.undo.concat(state.circles.slice(-1)),
      }
    case 'redo':
      return {
        circles: state.circles.concat(state.undo.slice(-1)),
        undo: state.undo.slice(0, -1),
      }
    default:
      return state
  }
}

interface Circle {
  readonly key: string
  readonly cx: number
  readonly cy: number
  readonly r: number
}
function Circle(cx: number, cy: number, r = 20): Circle {
  return { key: `${cx},${cy}`, cx, cy, r }
}

function grow<T extends { r: number }>(shape: T, dr: number): T {
  return { ...shape, r: shape.r + dr }
}

function deduplicate<T extends { key: unknown }>(items: readonly T[]): T[] {
  const m = new Map<T['key'], T>()
  for (const item of items) {
    m.set(item.key, item)
  }
  return Array.from(m.values())
}
