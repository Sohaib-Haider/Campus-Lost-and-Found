import mongoose from 'mongoose'


const categories = ['Electronics', 'Books', 'Clothing', 'ID & Cards', 'Keys', 'Bags', 'Other']

const locations = ['Library', 'Cafeteria', 'CS Department', 'Main Gate', 'Sports Ground', 'Auditorium']

const types = ['lost', 'found']


const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    enum: categories,
  },

  location: {
    type: String,
    required: true,
    enum: locations,
  },

  itemDate: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/,
  },

  contact: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    required: true,
    enum: types,
  },


  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  returned: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    versionKey: false,
    transform(doc, item) {
      item.id = item._id.toString()
      item.ownerId = item.ownerId.toString()
      delete item._id

      return item
    },
  },
})

const Item = mongoose.model('Item', itemSchema)

export { categories, locations, types }
export default Item
