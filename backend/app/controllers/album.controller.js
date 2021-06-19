const db = require("../models");
const Album = db.albums;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  const album = new Album({
    title: req.body.title
  });


  album
    .save(album)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Album."
      });
    });
};


exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  var condition = {};

  Album.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};

// Find a single Todo Item with an id
exports.findOne = (req, res) => {
  
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Album.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Album with id=${id}. Maybe Album was not found!`
        });
      } else res.send({ message: "Album was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Album.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Album with id=${id}. Maybe album was not found!`
      });
    } else res.send({ message: "Todo album was deleted successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error deleting album item with id=" + id
    });
  });
};

// Delete all Todo Items from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all completed Todo Items
exports.findAllCompleted = (req, res) => {
  
};