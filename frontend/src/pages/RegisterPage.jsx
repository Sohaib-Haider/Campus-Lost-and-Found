import { useState } from 'react'
import { Link } from 'react-router-dom'


function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!password) {
      newErrors.password = 'Please enter a password.'
    } else if (password.length < 8) {
      newErrors.password = 'Use at least 8 characters.'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'The passwords do not match.'
    }

    setErrors(newErrors)
    setMessage('')

    if (Object.keys(newErrors).length === 0) {
      setMessage('Your details look good. Registration is not connected yet, so no account has been created.')
    }
  }


  return (
    <section className="account-form">
      <h1>Register</h1>
      <p>This is a demo form. It does not create an account yet.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" autoComplete="name" required value={name}
            onChange={(event) => { setName(event.target.value); setMessage('') }}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" required value={email}
            onChange={(event) => { setEmail(event.target.value); setMessage('') }}
            aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
          {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="new-password" required minLength={8} value={password}
            onChange={(event) => { setPassword(event.target.value); setMessage('') }}
            aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-hint password-error' : 'password-hint'} />
          <p className="field-hint" id="password-hint">Use at least 8 characters.</p>
          {errors.password && <p className="field-error" id="password-error">{errors.password}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="confirm-password">Confirm password</label>
          <input id="confirm-password" type="password" autoComplete="new-password" required value={confirmPassword}
            onChange={(event) => { setConfirmPassword(event.target.value); setMessage('') }}
            aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined} />
          {errors.confirmPassword && <p className="field-error" id="confirm-password-error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Register</button>
        <p role="status">{message}</p>
      </form>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </section>
  )
}

export default RegisterPage
