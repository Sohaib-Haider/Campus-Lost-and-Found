import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


async function register(req, res) {
  const { name, email, password, confirmPassword } = req.body || {}
  const errors = {}

  if (typeof name !== 'string' || !name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (typeof email !== 'string' || !email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (typeof password !== 'string' || !password.trim()) {
    errors.password = 'Please enter a password.'
  } else if (password.length < 8) {
    errors.password = 'Use at least 8 characters.'
  } else if (Buffer.byteLength(password, 'utf8') > 72) {
    errors.password = 'Use a shorter password, up to 72 bytes.'
  }

  if (typeof confirmPassword !== 'string' || !confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'The passwords do not match.'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Please check your details.', errors })
  }


  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Registration is unavailable right now.' })
    }

    const savedEmail = email.trim().toLowerCase()
    const existingUser = await User.findOne({ email: savedEmail })

    if (existingUser) {
      return res.status(409).json({ message: 'This email is already registered.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name: name.trim(), email: savedEmail, passwordHash })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This email is already registered.' })
    }

    return res.status(500).json({ message: 'Could not register right now. Please try again.' })
  }
}


async function login(req, res) {
  const { email, password } = req.body || {}
  const errors = {}

  if (typeof email !== 'string' || !email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (typeof password !== 'string' || !password.trim()) {
    errors.password = 'Please enter your password.'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Please check your details.', errors })
  }


  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Login is unavailable right now.' })
    }

    const savedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: savedEmail }).select('+passwordHash')

    if (!user || Buffer.byteLength(password, 'utf8') > 72) {
      return res.status(401).json({ message: 'Email or password is incorrect.' })
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Email or password is incorrect.' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    return res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch {
    return res.status(500).json({ message: 'Could not log in right now. Please try again.' })
  }
}


function getCurrentUser(req, res) {
  const user = req.user

  res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email },
  })
}

export { register, login, getCurrentUser }
