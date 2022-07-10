import { useReducer } from 'react'
import { Action } from '../lib/state'
import { DateInput, SwitchInput } from './FlightBooker.components'
import { flightBookerReducer, FlightBookerState } from './FlightBooker.state'

function processBooking(data: FormData) {
  const dates = {
    start: data.get('start') as string,
    return: data.get('return') as string | null,
  }
  if (!dates.return) {
    return `Booked a one-way flight on ${dates.start}`
  }
  return `Booked a return flight from ${dates.start} to ${dates.return}`
}

export default function FlightBooker() {
  const [state, dispatch] = useReducer(
    flightBookerReducer,
    undefined,
    FlightBookerState
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const message = processBooking(data)
        dispatch(Action('booking_processed', { message }))
      }}
    >
      <fieldset>
        <label>
          <SwitchInput
            defaultChecked={state.returnEnabled}
            onChange={(value) => dispatch(Action('return_date_toggled', value))}
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
            onChange={(value) => dispatch(Action('start_date_changed', value))}
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
            onChange={(value) => dispatch(Action('return_date_changed', value))}
          />
        </label>
      </div>
      <button type="submit">Book</button>
      {state.message && <p>ℹ️ {state.message}</p>}
    </form>
  )
}
