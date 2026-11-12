import { categories, locations, types } from '../models/Item.js'


function isRealPastDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return false
  }

  return date <= new Date()
}


function checkItemInput(body) {
  const { title, description, category, location, itemDate, contact, type } = body || {}
  const errors = {}

  if (typeof type !== 'string' || !types.includes(type)) {
    errors.type = 'Please pick lost or found.'
  }

  if (typeof title !== 'string' || !title.trim()) {
    errors.title = 'Please enter a title.'
  }

  if (typeof description !== 'string' || !description.trim()) {
    errors.description = 'Please enter a description.'
  }

  if (typeof category !== 'string' || !categories.includes(category)) {
    errors.category = 'Please pick a category.'
  }

  if (typeof location !== 'string' || !locations.includes(location)) {
    errors.location = 'Please pick a location.'
  }

  if (typeof itemDate !== 'string' || !itemDate) {
    errors.itemDate = 'Please pick a date.'
  } else if (!isRealPastDate(itemDate)) {
    errors.itemDate = 'Please pick a real date that is not in the future.'
  }

  if (typeof contact !== 'string' || !contact.trim()) {
    errors.contact = 'Please enter a contact detail.'
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  return {
    values: {
      title: title.trim(),
      description: description.trim(),
      category,
      location,
      itemDate,
      contact: contact.trim(),
      type,
    },
  }
}

export { checkItemInput }
