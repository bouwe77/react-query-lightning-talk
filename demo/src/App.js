import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import submitForm from './forms'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>My Favorite Numbers</h1>
        <NumberStats />
        <CreateNumber />
        <NumberList />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

function NumberStats() {
  return (
    <div className="block">
      <>stats...</>
    </div>
  )
}

function CreateNumber() {
  const { createNumber } = useCreateNumber()

  const handleSubmit = submitForm((values) => {
    console.log('submitting', values)
    if (
      values?.number &&
      values.number.length > 0 &&
      typeof Number(values.number) === 'number'
    )
      createNumber({ number: Number(values.number) })
  })

  return (
    <div className="block">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="number">Number</label>
          <br />
          <input type="text" name="number" />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

function NumberList() {
  const { numbers, isLoading, error } = useNumbers()

  if (error) alert(error) //return 'Error...' + error
  if (isLoading) return 'Error...'

  return (
    <div className="block">
      <div className="number-list">
        {numbers.map((number) => (
          <button className="number-button" key={number.id}>
            {number.number}
          </button>
        ))}
      </div>
    </div>
  )
}

function useNumbers() {
  const { isLoading, error, data } = useQuery('numbers', () =>
    fetch('http://localhost:8123/numbers').then((res) => res.json()),
  )

  return { isLoading, error, numbers: data }
}

function useCreateNumber() {
  const { mutate } = useMutation(
    (newNumber) => {
      fetch('http://localhost:8123/numbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNumber),
      }).then((res) => {
        //console.log(res.json())
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('numbers')
      },
    },
  )

  return { createNumber: mutate }
}

export default App
