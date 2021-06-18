module.exports = app => {
    const album = require("../controllers/album.controller.js");
  
    var router = require("express").Router();
  
 
    router.post("/", album.create);
  
    
    router.get("/", album.findAll);
  
  
    router.get("/completed", album.findAllCompleted);
  
   
    router.get("/:id", album.findOne);
  
  
    router.put("/:id", album.update);
  
    // Delete a album item with id
    router.delete("/:id", album.delete);
  
    // Delete all album items
    router.delete("/", album.deleteAll);
  
    app.use('/api/albums', router);
  };