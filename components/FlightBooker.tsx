import { useEffect, useReducer, useState } from 'react'

interface BookingState {
  isReturn: boolean
  start: string
  return: string
}

const initialState: BookingState = {
  isReturn: false,
  start: new Date().toISOString().split('T')[0],
  return: new Date().toISOString().split('T')[0],
}

const actions = {
  setIsReturn(value: boolean) {
    return { type: 'SET_IS_RETURN', value } as const
  },
  setStart(value: string) {
    return { type: 'SET_START', value } as const
  },
  setReturn(value: string) {
    return { type: 'SET_RETURN', value } as const
  },
} as const
type BookingAction = ReturnType<typeof actions[keyof typeof actions]>

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_IS_RETURN':
      return { ...state, isReturn: action.value }
    case 'SET_START':
      return { ...state, start: action.value }
    case 'SET_RETURN':
      return { ...state, return: action.value }
    default:
      return state
  }
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
  const [state, dispatch] = useReducer(reducer, initialState)
  const [message, setMessage] = useState('')
  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    // Clear old message when state changes
    setMessage('')
  }, [state])

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
          value={state.isReturn ? 'return' : 'single'}
          onChange={(e) =>
            dispatch(actions.setIsReturn(e.currentTarget.value === 'return'))
          }
          className="rounded border"
        >
          <option value="single">one-way flight</option>
          <option value="return">return flight</option>
        </select>
        <input
          type="date"
          name="start"
          value={state.start}
          onChange={(e) => dispatch(actions.setStart(e.currentTarget.value))}
          className="border invalid:border-pink-500 invalid:text-pink-600"
        />
        <input
          type="date"
          name="return"
          disabled={!state.isReturn}
          value={state.return}
          min={state.start}
          onChange={(e) => dispatch(actions.setReturn(e.currentTarget.value))}
          className="border invalid:border-pink-500 invalid:text-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={invalid || (state.isReturn && state.start > state.return)}
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
