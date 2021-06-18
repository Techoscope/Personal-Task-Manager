module.exports = app => {
    const post = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  

    router.post("/", post.create);
  

    router.get("/", post.findAll);
  

    router.get("/:id", post.findOne);
  

    router.put("/:id", post.update);
  

    router.delete("/:id", post.delete);

    router.delete("/", post.deleteAll);
  
    app.use('/api/posts', router);
  };