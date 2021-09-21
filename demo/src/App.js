import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

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

  function handleSubmit(event) {
    event.preventDefault()
    //hiero dev.to shizzle
    createNumber({ number: 88 })
  }

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

  if (error) return 'Error...' + error
  if (isLoading) return 'Error...'

  return (
    <div className="block">
      {numbers.map((number) => (
        <div key={number.id}>{number.number}</div>
      ))}
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
      console.log('hiero')
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
