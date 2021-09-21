import { useRef } from 'react'
import { useCreateNumber } from './useCreateNumber'

export function CreateNumber() {
  const { createNumber } = useCreateNumber()
  const numberInputRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    const enteredValue = numberInputRef.current.value
    if (
      !enteredValue ||
      enteredValue.length < 1 ||
      typeof Number(enteredValue) !== 'number'
    ) {
      alert('Please enter a number')
      return
    }

    createNumber({ number: Number(enteredValue) })
    numberInputRef.current.value = ''
  }

  return (
    <div className="block">
      <h2>Enter your new favorite number here!</h2>
      <form onSubmit={handleSubmit} autocomplete="off">
        <div>
          <input
            type="text"
            name="number"
            ref={numberInputRef}
            className="number-input"
          />
          <button type="submit" className="number-submit">
            SAVE
          </button>
        </div>
      </form>
    </div>
  )
}
