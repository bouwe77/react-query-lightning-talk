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
    <div>
      <Header />

      {signedIn ? (
        <FavoriteNumbers />
      ) : (
        <SignIn onSuccess={() => setToggle(!toggle)} />
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
      <ReactQueryDevtools initialIsOpen={false} />
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
      <div className="signin">
        {signedIn ? <button onClick={signOut}>sign out</button> : null}
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
