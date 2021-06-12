const express = require("express");

const app = express();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to personal task management application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
