const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true
  },
  priority: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    required: true
  },
  deadLine: {
    type:  String,
    required: false
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('todos', todoSchema)