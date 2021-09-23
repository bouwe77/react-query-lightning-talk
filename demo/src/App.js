import { useState } from 'react'
import { QueryClient, QueryClientProvider, useIsFetching } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SignIn } from './auth/SignIn'
import { useAuth } from './auth/useAuth'
import { CreateNumber } from './create/CreateNumber'
import { NumberDetail } from './detail/NumberDetail'
import { NumberList } from './list/NumberList'
import { NumberStats } from './stats/NumberStats'

const queryClient = new QueryClient()

function App() {
  const { signedIn } = useAuth()
  const [toggle, setToggle] = useState(false)

  return (
    <div className="container">
      <Header />

      {signedIn ? (
        <FavoriteNumbers />
      ) : (
        <>
          <h2>Finally a place to collect your favorite numbers!</h2>
          Please sign in to get started now!
          <SignIn onSuccess={() => setToggle(!toggle)} />
        </>
      )}
    </div>
  )
}

function FavoriteNumbers() {
  const [selectedNumberId, setSelectedNumberId] = useState()

  return (
    <QueryClientProvider client={queryClient}>
      {selectedNumberId ? (
        <NumberDetail
          id={selectedNumberId}
          back={() => setSelectedNumberId(null)}
        />
      ) : (
        <>
          <NumberStats />
          <CreateNumber />
          <NumberList selectNumberId={(id) => setSelectedNumberId(id)} />
        </>
      )}
      <GlobalLoadingIndicator />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

function Header() {
  const { signedIn, signOut } = useAuth()

  return (
    <header>
      <div className="logo">
        <h1>My Favorite Numbers</h1>
      </div>
      <div className="signout">
        {signedIn ? (
          <button onClick={signOut} className="signout-button">
            sign out
          </button>
        ) : null}
      </div>
    </header>
  )
}

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching()

  return isFetching ? (
    <div>Queries are fetching in the background...</div>
  ) : null
}

export default App
