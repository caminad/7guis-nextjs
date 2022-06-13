import { useEffect, useReducer, useState } from 'react'
import { Action } from '../lib/action'
import { DateInput, SwitchInput } from './FlightBooker/components'
import { init, reducer } from './FlightBooker/state'

function processBooking(data: FormData) {
  const dates = {
    start: data.get('start') as string,
    return: data.get('return') as string | null,
  }
  if (!dates.return) {
    return `Booking a one-way flight on ${dates.start}`
  }
  return `Booking a return flight from ${dates.start} to ${dates.return}`
}

export default function FlightBooker() {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  const [message, setMessage] = useState('')

  useEffect(() => setMessage(''), [state])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setMessage(processBooking(data))
      }}
    >
      <fieldset>
        <label>
          <SwitchInput
            defaultChecked={state.returnEnabled}
            onChange={(value) => dispatch(Action('enable_return', value))}
          />{' '}
          Return flight
        </label>
      </fieldset>
      <div className="grid">
        <label>
          Start date
          <DateInput
            name="start"
            min={state.min}
            max={state.max}
            value={state.start}
            onChange={(value) => dispatch(Action('start', value))}
          />
        </label>
        <label>
          Return date
          <DateInput
            name="return"
            disabled={!state.returnEnabled}
            min={state.min}
            max={state.max}
            value={state.return}
            onChange={(value) => dispatch(Action('return', value))}
          />
        </label>
      </div>
      <button type="submit">Book</button>
      {message && <p>ℹ️ {message}</p>}
    </form>
  )
}
