import { useDeleteNumber } from '../delete/useDeleteNumber'
import { useNumber } from './useNumber'

export function NumberDetail({ id, back }) {
  const { data: number, isLoading, error } = useNumber(id)
  const { mutate: deleteNumber } = useDeleteNumber(id)

  function handleDelete() {
    deleteNumber(id)
    back()
  }

  if (error) alert(error)
  if (isLoading) return 'Loading...'

  return (
    <>
      <button onClick={back} className="back">
        {'<< back'}
      </button>

      <br />
      <br />
      <h2> Look how great this number is!</h2>

      <div className="number-detail-container">
        <h1 className="number-detail">{number.number}</h1>
      </div>

      <br />

      <button onClick={handleDelete} className="back">
        delete
      </button>
    </>
  )
}
