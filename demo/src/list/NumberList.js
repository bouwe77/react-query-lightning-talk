import { useNumbers } from './useNumbers'

export function NumberList({ selectNumberId }) {
  const { numbers, isLoading, error } = useNumbers()

  if (error) alert(error) //return 'Error...' + error
  if (isLoading) return 'Error...'

  return (
    <div className="block">
      <h2>Here are your favorite numbers:</h2>
      <div className="number-list">
        {numbers.map((number) => (
          <button
            className="number-button"
            key={number.id}
            onClick={() => selectNumberId(number.id)}
          >
            {number.number}
          </button>
        ))}
      </div>
    </div>
  )
}
