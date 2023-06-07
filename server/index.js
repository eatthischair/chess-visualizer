require("dotenv").config();

const axios = require("axios");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const db = require("./db/database");
const router = require("./routes");
// ----- Middleware ----- //
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join("src")));

app.use(express.urlencoded({ extended: true }));

app.use(router);
db.connect()
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
