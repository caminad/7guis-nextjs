import { useEffect, useState } from 'react'

function today() {
  return new Date().toISOString().split('T')[0]
}

function processBooking(data: FormData) {
  const dates = {
    start: data.get('start'),
    return: data.get('return'),
  }
  if (typeof dates.start !== 'string') {
    return `Booking failed: start date is missing`
  }
  if (typeof dates.return !== 'string') {
    return `Booking a single flight on ${dates.start}`
  }
  return `Booking a return flight from ${dates.start} to ${dates.return}`
}

function FlightBooker() {
  const [isReturn, setIsReturn] = useState(false)
  const [startDate, setStartDate] = useState(today)
  const [returnDate, setReturnDate] = useState(startDate)
  const [message, setMessage] = useState('')
  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    // Clear old message when dates change
    setMessage('')
  }, [startDate, returnDate])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setMessage(processBooking(data))
      }}
      onChange={(e) => setInvalid(!e.currentTarget.checkValidity())}
      onInvalid={() => setInvalid(true)}
      className="grid gap-2"
    >
      <div className="grid auto-rows-fr gap-2">
        <select
          value={isReturn ? 'return' : 'single'}
          onChange={(e) => setIsReturn(e.currentTarget.value === 'return')}
          className="rounded border"
        >
          <option value="single">one-way flight</option>
          <option value="return">return flight</option>
        </select>
        <input
          type="date"
          name="start"
          value={startDate}
          min={today()}
          onChange={(e) => setStartDate(e.currentTarget.value)}
          className="border invalid:border-pink-500 invalid:text-pink-600"
        />
        <input
          type="date"
          name="return"
          disabled={!isReturn}
          value={returnDate}
          min={startDate}
          onChange={(e) => setReturnDate(e.currentTarget.value)}
          className="border invalid:border-pink-500 invalid:text-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={invalid || (isReturn && startDate > returnDate)}
          className="rounded border p-1 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Book
        </button>
      </div>
      {message && <p className="text-sm text-gray-600">ℹ️ {message}</p>}
    </form>
  )
}

export default FlightBooker
