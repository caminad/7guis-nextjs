import { Dispatch, useEffect, useRef, useState } from 'react'

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

function SwitchInput(props: {
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

function DateInput(props: {
  name: string
  disabled?: boolean
  min: string
  value: string
  onChange: Dispatch<string>
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [invalid, setInvalid] = useState<boolean>()

  useEffect(() => {
    if (ref.current) {
      setInvalid(!ref.current.checkValidity())
    }
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

function FlightBooker() {
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
    if (formRef.current) {
      setInvalid(!formRef.current.checkValidity())
    }
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
      <button type="submit" disabled={invalid}>
        Book
      </button>
      {message && <p>ℹ️ {message}</p>}
    </form>
  )
}

export default FlightBooker
