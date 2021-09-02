const Todo = require('../models/Todo')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const todos = await Todo.find({user: req.user.id})
    res.status(200).json(todos)
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.delete = async function (req, res) {
  try {
    await Todo.remove({_id: req.params.id})
    res.status(200).json({
      message: `Задача удалена`
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  try {
    const todo = await new Todo({
      title: req.body.title,
      priority: req.body.priority,
      status: req.body.status,
      deadLine: req.body.deadLine,
      user: req.user.id
    }).save()
    res.status(201).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  try {
    const todo = await Todo.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
    )
    res.status(200).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }
}