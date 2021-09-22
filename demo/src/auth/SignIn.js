import { useRef, useState } from 'react'
import { useAuth } from './useAuth'

export function SignIn({ onSuccess }) {
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const [error, setError] = useState(false)
  const { signIn } = useAuth()

  function handleSignIn(event) {
    event.preventDefault()

    const username = usernameInputRef.current.value
    if (!username || username.length === 0) {
      setError(true)
      return
    }

    const password = passwordInputRef.current.value
    if (!password || password.length === 0) {
      setError(true)
      return
    }

    const success = signIn(username)
    setError(success)

    if (success) onSuccess()
  }

  return (
    <>
      <span className="error">
        {error ? (
          <>
            Please enter <b>any</b> username and <b>any</b> password ;)
            <br />
          </>
        ) : null}
      </span>
      <form onSubmit={handleSignIn}>
        Username <input type="text" ref={usernameInputRef} />
        <br />
        Password <input type="password" ref={passwordInputRef} />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </>
  )
}
