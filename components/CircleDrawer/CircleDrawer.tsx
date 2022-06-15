import { useReducer } from 'react'
import { Action } from '../../lib/action'
import { Canvas, RedoButton, UndoButton } from './ui'
import { reducer, State } from './state'

export default function CircleDrawer() {
  const [state, dispatch] = useReducer(reducer, undefined, State)
  return (
    <form>
      <div className="grid">
        <UndoButton
          disabled={state.circles.length === 0}
          onUndo={() => dispatch(Action('undo'))}
        />
        <RedoButton
          disabled={state.undo.length === 0}
          onRedo={() => dispatch(Action('redo'))}
        />
      </div>
      <Canvas
        circles={state.circles}
        onAdd={(circle) => dispatch(Action('add', circle))}
      />
    </form>
  )
}
