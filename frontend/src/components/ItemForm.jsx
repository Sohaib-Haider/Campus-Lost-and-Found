import { useState } from 'react'
import { categories, locations } from '../data/sampleItems.js'


function ItemForm({ onSave, item }) {
  const [type, setType] = useState(item ? item.type : '')



  const [title, setTitle] = useState(item ? item.title : '')



  const [description, setDescription] = useState(item ? item.description : '')



  const [category, setCategory] = useState(item ? item.category : '')



  const [location, setLocation] = useState(item ? item.location : '')



  const [itemDate, setItemDate] = useState(item ? item.itemDate : '')



  const [contact, setContact] = useState(item ? item.contact : '')

  const [errors, setErrors] = useState({})


  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!type.trim()) {
      newErrors.type = 'Please pick lost or found.'
    }

    if (!title.trim()) {
      newErrors.title = 'Please enter a title.'
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a description.'
    }

    if (!category.trim()) {
      newErrors.category = 'Please pick a category.'
    }

    if (!location.trim()) {
      newErrors.location = 'Please pick a location.'
    }

    if (!itemDate) {
      newErrors.itemDate = 'Please pick a date.'
    } else if (new Date(itemDate) > new Date()) {
      newErrors.itemDate = 'Date cannot be in the future.'
    }

    if (!contact.trim()) {
      newErrors.contact = 'Please enter a contact detail.'
    }

    setErrors(newErrors)


    if (Object.keys(newErrors).length === 0) {
      const newItem = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        location: location.trim(),
        itemDate: itemDate.trim(),
        contact: contact.trim(),
        type: type,
        returned: false,
        createdAt: new Date().toISOString(),
      }
      onSave(newItem)
    }
  }


  return (
    <form className="account-form" onSubmit={handleSubmit} noValidate>
      <h1>{item ? 'Edit Item' : 'Post an Item'}</h1>

      <div className="form-field">
        <label htmlFor="form-type">Lost or found</label>
        <select id="form-type" value={type} onChange={(event) => setType(event.target.value)}>
          <option value="">Pick one</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        {errors.type && <p className="field-error">{errors.type}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="form-title">Title</label>
        <input id="form-title" value={title} onChange={(event) => setTitle(event.target.value)} />
        {errors.title && <p className="field-error">{errors.title}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="form-description">Description</label>
        <textarea id="form-description" value={description} onChange={(event) => setDescription(event.target.value)} />
        {errors.description && <p className="field-error">{errors.description}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="form-category">Category</label>
        <select id="form-category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Pick one</option>
          {categories.map((categoryName) => (
            <option key={categoryName} value={categoryName}>{categoryName}</option>
          ))}
        </select>
        {errors.category && <p className="field-error">{errors.category}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="form-location">Location</label>
        <select id="form-location" value={location} onChange={(event) => setLocation(event.target.value)}>
          <option value="">Pick one</option>
          {locations.map((locationName) => (
            <option key={locationName} value={locationName}>{locationName}</option>
          ))}
        </select>
        {errors.location && <p className="field-error">{errors.location}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="form-date">Date</label>
        <input id="form-date" type="date" value={itemDate} onChange={(event) => setItemDate(event.target.value)} />
        {errors.itemDate && <p className="field-error">{errors.itemDate}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="form-contact">Contact detail</label>
        <input id="form-contact" value={contact} onChange={(event) => setContact(event.target.value)} />
        {errors.contact && <p className="field-error">{errors.contact}</p>}
      </div>

      <button type="submit">{item ? 'Update Item' : 'Post Item'}</button>

    </form>
  )
}

export default ItemForm
