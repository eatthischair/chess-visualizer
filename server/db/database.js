const { Client } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "chessvisualizer",
  password: "platypus1",
  port: 5432,
});

module.exports = db;
