const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.todos = require("./todo.model.js")(mongoose);
db.userList = require("./userList.model.js")(mongoose);
//db.posts = require("./post.model.js")(mongoose);
//db.albums = require("./album.model.js")(mongoose);

module.exports = db;