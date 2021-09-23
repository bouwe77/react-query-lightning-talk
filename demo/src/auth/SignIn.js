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
        <div className="form-row">
          Username
          <br />
          <input type="text" className="signin-field" ref={usernameInputRef} />
        </div>
        <div className="form-row">
          Password
          <br />
          <input
            type="password"
            className="signin-field"
            ref={passwordInputRef}
          />
        </div>
        <div className="form-row">
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </div>
      </form>
    </>
  )
}
