module.exports = app => {
  const todo = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Todo Item
  router.post("/", todo.create);

  // Retrieve all Todo Items
  router.get("/", todo.findAll);

  // Retrieve all completed todo items
  router.get("/completed", todo.findAllCompleted);

  // Retrieve a single todo items with id
  router.get("/:id", todo.findOne);

  // Update a todo item with id
  router.put("/:id", todo.update);

  // Delete a todo item with id
  router.delete("/:id", todo.delete);

  // Delete all todo items
  router.delete("/", todo.deleteAll);

  app.use('/api/todos', router);
};