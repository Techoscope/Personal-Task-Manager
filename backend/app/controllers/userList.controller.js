const db = require("../models");
const User = db.userList;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  var condition = {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single Todo Item with an id
exports.findOne = (req, res) => {
  
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, {new:true, useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, {useFindAndModify: false, new: true})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete User with id=${id}. Maybe user was not found!`
      });
    } else res.send({ message: "User was deleted successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error deleting User with id=" + id
    });
  });
};

// Delete all Todo Items from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all completed Todo Items
exports.findAllCompleted = (req, res) => {
  
};