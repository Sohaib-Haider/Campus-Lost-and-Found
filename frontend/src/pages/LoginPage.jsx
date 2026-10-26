import { useState } from 'react'
import { Link } from 'react-router-dom'


function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!password.trim()) {
      newErrors.password = 'Please enter your password.'
    }

    setErrors(newErrors)
    setMessage('')

    if (Object.keys(newErrors).length === 0) {
      setMessage('Your details look good. Login is not connected yet, so you have not been logged in.')
    }
  }


  return (
    <section className="account-form">
      <h1>Login</h1>
      <p>This is a demo form. It does not log you in yet.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setMessage('')
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
          />
          {errors.email && <p className="field-error" id="login-email-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setMessage('')
            }}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
          />
          {errors.password && <p className="field-error" id="login-password-error">{errors.password}</p>}
        </div>

        <button type="submit">Login</button>
        <p role="status">{message}</p>
      </form>

      <p>Need an account? <Link to="/register">Register</Link></p>
    </section>
  )
}

export default LoginPage
