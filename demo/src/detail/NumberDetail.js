import { useNumber } from './useNumber'

export function NumberDetail({ id, back }) {
  const { number, isLoading, error } = useNumber(id)

  if (error) alert(error)
  if (isLoading) return 'Loading...'

  return (
    <>
      <button onClick={back} className="back">
        {'<< back'}
      </button>
      <div className="number-detail-container">
        <h1 className="number-detail">{number.number}</h1>
      </div>
    </>
  )
}
