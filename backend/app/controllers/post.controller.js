const db = require("../models");
const Post = db.posts;


exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

 
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  
  post
    .save(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};


exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  var condition = {};

  Post.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
  .then(data=>{
      if(!data){
          res.status(404).send({
              message: `Error occurred while finding post with id= ${id}.`
          })
      } else {res.send(data)}
  })
  .catch(err=>{
      res.status(500).send({
          message: 
          err.message || "Cannot access the data"
      })
  })
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body, {new:true, useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndRemove(id, {useFindAndModify: false, new: true})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete post with id=${id}. Maybe post was not found!`
      });
    } else res.send({ message: "User was deleted successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error deleting Post with id=" + id
    });
  });
};

// Delete all Todo Items from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all completed Todo Items
exports.findAllCompleted = (req, res) => {
  
};