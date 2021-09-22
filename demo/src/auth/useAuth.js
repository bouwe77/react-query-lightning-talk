import { createLocalStorageStateHook } from 'use-local-storage-state'

const useLocalStorageState = createLocalStorageStateHook('user')

export function useAuth() {
  const [user, setUser, { removeItem }] = useLocalStorageState()

  function signIn(username) {
    if (!username || username.length === 0) {
      signOut()
      return false
    }

    setUser(username)
    return true
  }

  function signOut() {
    removeItem()
  }

  const signedIn = !!user

  return { signIn, username: user, signedIn, signOut }
}
