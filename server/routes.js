const express = require("express");
const router = express.Router();

const {
  getCurrentLogin,
  signUpUser,
  saveGameToDb,
  getGamesFromDb,
} = require("./controllers");

router.get("/getLogin", getCurrentLogin);

router.post("/signUp", signUpUser);

router.post("/saveGame", saveGameToDb);

router.get("/getGames", getGamesFromDb);

module.exports = router;
