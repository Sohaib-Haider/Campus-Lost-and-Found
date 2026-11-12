import mongoose from 'mongoose'
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


async function getMyItems(req, res) {
  try {
    const items = await Item.find({ ownerId: req.user.id }).sort({ createdAt: -1, _id: -1 })

    return res.status(200).json({ items })
  } catch {
    return res.status(500).json({ message: 'Could not load your posts right now. Please try again.' })
  }
}


async function getItem(req, res) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: 'Invalid item ID.' })
  }

  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' })
    }

    return res.status(200).json({ item })
  } catch {
    return res.status(500).json({ message: 'Could not load the item right now. Please try again.' })
  }
}


async function findOwnedItem(req, res) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    res.status(400).json({ message: 'Invalid item ID.' })
    return null
  }

  const item = await Item.findById(req.params.id)

  if (!item) {
    res.status(404).json({ message: 'Item not found.' })
    return null
  }

  if (item.ownerId.toString() !== req.user.id) {
    res.status(403).json({ message: 'You can only change your own posts.' })
    return null
  }

  return item
}


async function updateItem(req, res) {
  try {
    const item = await findOwnedItem(req, res)

    if (!item) {
      return
    }

    const { errors, values } = checkItemInput(req.body)

    if (errors) {
      return res.status(400).json({ message: 'Please check your details.', errors })
    }

    item.set(values)
    await item.save()

    return res.status(200).json({ item })
  } catch {
    return res.status(500).json({ message: 'Could not update the item right now. Please try again.' })
  }
}


async function deleteItem(req, res) {
  try {
    const item = await findOwnedItem(req, res)

    if (!item) {
      return
    }

    await item.deleteOne()

    return res.status(200).json({ message: 'Item deleted.' })
  } catch {
    return res.status(500).json({ message: 'Could not delete the item right now. Please try again.' })
  }
}


async function markReturned(req, res) {
  try {
    const item = await findOwnedItem(req, res)

    if (!item) {
      return
    }

    item.returned = true
    await item.save()

    return res.status(200).json({ item })
  } catch {
    return res.status(500).json({ message: 'Could not update the item right now. Please try again.' })
  }
}

export { createItem, getItems, getMyItems, getItem, updateItem, deleteItem, markReturned }
