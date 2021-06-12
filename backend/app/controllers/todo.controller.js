const db = require("../models");
const Todo = db.todos;

// Create and Save a new Todo Item
exports.create = (req, res) => {
  
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