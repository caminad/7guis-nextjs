import { useEffect, useRef, useState } from 'react'
import { DateInput, SwitchInput } from './FlightBooker/components'

function processBooking(data: FormData) {
  const dates = {
    start: data.get('start'),
    return: data.get('return'),
  }
  if (typeof dates.start !== 'string') {
    return `Booking failed: start date is missing`
  }
  if (typeof dates.return !== 'string') {
    return `Booking a one-way flight on ${dates.start}`
  }
  return `Booking a return flight from ${dates.start} to ${dates.return}`
}

export default function FlightBooker() {
  const [today] = useState(() => {
    return new Date().toISOString().split('T')[0]
  })

  const [returnEnabled, setReturnEnabled] = useState(false)
  const [startDate, setStartDate] = useState(today)
  const [returnDate, setReturnDate] = useState(startDate)
  const [message, setMessage] = useState('')
  const [invalid, setInvalid] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setMessage('')
    setInvalid(!formRef.current!.checkValidity())
  }, [returnEnabled, startDate, returnDate])

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setMessage(processBooking(data))
      }}
    >
      <fieldset>
        <label>
          <SwitchInput
            defaultChecked={returnEnabled}
            onChange={setReturnEnabled}
          />{' '}
          Return flight
        </label>
      </fieldset>
      <div className="grid">
        <label>
          Start date
          <DateInput
            name="start"
            min={today}
            value={startDate}
            onChange={setStartDate}
          />
        </label>
        <label>
          Return date
          <DateInput
            name="return"
            disabled={!returnEnabled}
            min={startDate}
            value={returnDate}
            onChange={setReturnDate}
          />
        </label>
      </div>
      <button type="submit" disabled={invalid}>
        Book
      </button>
      {message && <p>ℹ️ {message}</p>}
    </form>
  )
}
