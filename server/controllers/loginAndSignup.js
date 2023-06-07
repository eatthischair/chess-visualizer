const { getLogin, signUp, saveGame, getGames } = require("../db");

const getCurrentLogin = (req, res) => {
  const { username } = req.query;
  console.log("inside get currentlogin", username, req.query);
  return getLogin(username)
    .then((data) => {
      console.log("data in getlogin", data.rows[0]);
      res.send(data.rows[0]);
    })
    .catch((err) => {
      res.status(404).send("unable to get userId");
    });
};

const signUpUser = (req, res) => {
  const { username, password } = req.body;
  console.log("request in signup", req.body, username, password);
  return signUp(username, password)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send("cannot sign up user");
    });
};

const saveGameToDb = (req, res) => {
  const { pgn, user } = req.body;
  console.log("save game controller", req.body, pgn, user);
  return saveGame(pgn, user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send("cannot save game");
    });
};

const getGamesFromDb = (req, res) => {
  const { username } = req.query;
  console.log("getgamesfromdb", req.query);
  return getGames(username)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send("cannot get games from db");
    });
};

module.exports = {
  getCurrentLogin: getCurrentLogin,
  signUpUser: signUpUser,
  saveGameToDb: saveGameToDb,
  getGamesFromDb: getGamesFromDb,
};
