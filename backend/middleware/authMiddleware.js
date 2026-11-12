import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'


async function authMiddleware(req, res, next) {
  const authorization = req.get('Authorization')

  if (!authorization) {
    return res.status(401).json({ message: 'Please log in again.' })
  }

  const parts = authorization.trim().split(/\s+/)

  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Please log in again.' })
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Login checks are unavailable right now.' })
  }


  let decoded

  try {
    decoded = jwt.verify(parts[1], process.env.JWT_SECRET, { algorithms: ['HS256'] })
  } catch {
    return res.status(401).json({ message: 'Please log in again.' })
  }

  if (!decoded || typeof decoded.userId !== 'string' || !mongoose.isObjectIdOrHexString(decoded.userId)) {
    return res.status(401).json({ message: 'Please log in again.' })
  }

  try {
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'Please log in again.' })
    }

    req.user = user
  } catch {
    return res.status(500).json({ message: 'Could not check your login. Please try again.' })
  }

  next()
}

export default authMiddleware
