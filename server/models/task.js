const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' },
  priority: { type: Number, default: 1 },
  dueDate: { type: Date }
})

module.exports = mongoose.model('Task', taskSchema)
