import Item from '../models/Item.js'
import { checkItemInput } from '../utils/itemValidation.js'


async function createItem(req, res) {
  const { errors, values } = checkItemInput(req.body)

  if (errors) {
    return res.status(400).json({ message: 'Please check your details.', errors })
  }

  try {
    const item = await Item.create({ ...values, ownerId: req.user.id })

    return res.status(201).json({ item })
  } catch {
    return res.status(500).json({ message: 'Could not save the item right now. Please try again.' })
  }
}

export { createItem }
