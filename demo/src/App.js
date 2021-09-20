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
        <h1>React Query Demo</h1>
        <MovieStats />
        <CreateMovie />
        <MovieList />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

function MovieStats() {
  return (
    <div className="block">
      <>stats...</>
    </div>
  )
}

function CreateMovie() {
  const { createMovie } = useCreateMovie()

  function handleSubmit(event) {
    event.preventDefault()
    console.log(new FormData(event.target))
    createMovie({ title: 'Star Wars' })
  }

  return (
    <div className="block">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input type="text" name="title" />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

function MovieList() {
  const { movies, isLoading, error } = useMovies()

  if (error) return 'Error...' + error
  if (isLoading) return 'Error...'

  return (
    <div className="block">
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  )
}

function useMovies() {
  const { isLoading, error, data } = useQuery('movies', () =>
    fetch('http://localhost:3888/movies').then((res) => res.json()),
  )

  return { isLoading, error, movies: data }
}

function useCreateMovie() {
  const { mutate } = useMutation(
    (newMovie) =>
      fetch('http://localhost:3888/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      }).then((res) => {
        //console.log(res.json())
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('movies')
      },
    },
  )

  return { createMovie: mutate }
}

export default App
