import { useAuth } from './auth/useAuth'

export function useApi() {
  const { username } = useAuth()

  if (!username) throw Error('Unauthorized')

  return { numbersUrl: `http://localhost:8123/${username}/` }
}
