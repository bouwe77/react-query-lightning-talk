import { useState } from 'react'
import { QueryClient, QueryClientProvider, useIsFetching } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Box } from './Box'
import { CreateNumber } from './create/CreateNumber'
import { NumberDetail } from './detail/NumberDetail'
import { NumberList } from './list/NumberList'

const queryClient = new QueryClient()

function App() {
  const [selectedNumberId, setSelectedNumberId] = useState()

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>My Favorite Numbers</h1>
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
      </div>
      <GlobalLoadingIndicator />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function NumberStats() {
  return (
    <Box>
      <>stats...</>
    </Box>
  )
}

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching()

  return isFetching ? (
    <div>Queries are fetching in the background...</div>
  ) : null
}

export default App
