import { useRef } from 'react'
import { Box } from '../Box'
import { useCreateNumber } from './useCreateNumber'

export function CreateNumber() {
  const { mutate: createNumber } = useCreateNumber()
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
    <Box>
      <h2>Enter your new favorite number here!</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            type="number"
            name="number"
            ref={numberInputRef}
            className="number-input"
            maxLength="10"
            step="any"
          />
          <button type="submit" className="number-submit">
            save
          </button>
        </div>
      </form>
    </Box>
  )
}
