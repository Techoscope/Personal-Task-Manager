const db = require("../models");
const Todo = db.todos;

// Create and Save a new Todo Item
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Todo Item
  const todo = new Todo({
    title: req.body.title,
    completed: false
  });

  // Save Tutorial in the database
  todo
    .save(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo Item."
      });
    });
};

// Retrieve all Todo Items from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  var condition = {};

  Todo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todo items."
      });
    });
};

// Find a single Todo Item with an id
exports.findOne = (req, res) => {
  
};

// Update a Todo Item by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Todo Item with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Todo Items from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all completed Todo Items
exports.findAllCompleted = (req, res) => {
  
};