import { useAuth } from '../auth/useAuth'
import { Box } from '../Box'
import { useNumbers } from '../list/useNumbers'

export function NumberStats() {
  const { numbers, isLoading, error } = useNumbers()
  const { username } = useAuth()

  if (error) alert(error)
  if (isLoading) return 'Loading...'

  const howMany =
    numbers.length === 0
      ? "You have no favorite numbers yet, go add some, it's fun!"
      : `You have ${numbers.length} favorite number(s), that's so cool!`
  const biggest = Math.max.apply(
    null,
    numbers.map((n) => n.number),
  )
  const smallest = Math.min.apply(
    null,
    numbers.map((n) => n.number),
  )

  return (
    <Box>
      <>
        <h2>Welcome {username}!</h2>

        <b>{howMany}</b>
        {numbers.length > 0 ? (
          <>
            <br />
            The biggest number you like is <b>{biggest}</b>
            <br />
            The smallest number you like is <b>{smallest}</b>
          </>
        ) : null}
      </>
    </Box>
  )
}
