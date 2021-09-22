import { Box } from '../Box'
import { useNumbers } from '../list/useNumbers'

export function NumberStats() {
  const { numbers, isLoading, error } = useNumbers()

  if (error) alert(error)
  if (isLoading) return 'Loading...'

  return (
    <Box>
      <>
        You have <b>{numbers.length}</b> favorite numbers!
      </>
    </Box>
  )
}
