import Item, { categories, locations, types } from '../models/Item.js'
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


async function getItems(req, res) {
  const { search, category, type, location } = req.query
  const errors = {}

  if (search !== undefined && typeof search !== 'string') {
    errors.search = 'Search must be text.'
  }

  if (category !== undefined && !categories.includes(category)) {
    errors.category = 'Please pick a valid category.'
  }

  if (type !== undefined && !types.includes(type)) {
    errors.type = 'Please pick lost or found.'
  }

  if (location !== undefined && !locations.includes(location)) {
    errors.location = 'Please pick a valid location.'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Please check your filters.', errors })
  }

  const filter = { returned: false }

  if (category) filter.category = category
  if (type) filter.type = type
  if (location) filter.location = location

  if (search && search.trim()) {
    const text = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    filter.$or = [
      { title: { $regex: text, $options: 'i' } },
      { description: { $regex: text, $options: 'i' } },
    ]
  }

  try {
    const items = await Item.find(filter).sort({ createdAt: -1, _id: -1 })

    return res.status(200).json({ items })
  } catch {
    return res.status(500).json({ message: 'Could not load items right now. Please try again.' })
  }
}

export { createItem, getItems }
