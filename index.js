const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Started on http://localhost:8080");
  console.log("Press CTRL + C to stop server");
});
