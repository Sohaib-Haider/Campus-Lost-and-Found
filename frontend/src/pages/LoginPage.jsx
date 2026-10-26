import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})


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


    if (Object.keys(newErrors).length === 0) {
      onLogin({
        id: 'user-1',
        name: 'Demo Student',
        email: 'student@example.com',
      })
      navigate('/')
    }
  }


  return (
    <section className="account-form">
      <h1>Login</h1>
      <p>This is a demo. Any valid email and non-empty password will open the sample student session. No real account is checked.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
          />
          {errors.password && <p className="field-error" id="login-password-error">{errors.password}</p>}
        </div>

        <button type="submit">Login</button>

      </form>

      <p>Need an account? <Link to="/register">Register</Link></p>
    </section>
  )
}

export default LoginPage
