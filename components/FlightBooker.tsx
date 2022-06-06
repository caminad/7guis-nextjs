import { useEffect, useRef, useState } from 'react'

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

function DateInput(props: {
  name: string
  disabled?: boolean
  min: string
  value: string
  onChange: (value: string) => void
}) {
  const [invalid, setInvalid] = useState<boolean>()

  useEffect(() => {
    if (inputRef.current) {
      setInvalid(!inputRef.current.checkValidity())
    }
  }, [props.min, props.value])

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <input
      ref={inputRef}
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

  const [isReturn, setIsReturn] = useState(false)
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
  }, [isReturn, startDate, returnDate])

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setMessage(processBooking(data))
      }}
    >
      <select
        value={isReturn ? 'return' : ''}
        onChange={(e) => setIsReturn(e.currentTarget.value === 'return')}
      >
        <option value="">one-way flight</option>
        <option value="return">return flight</option>
      </select>
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
          disabled={!isReturn}
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
