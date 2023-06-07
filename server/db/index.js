const db = require("./database");
const { getLogin, signUp, saveGame, getGames } = require("./loginandSignup");

module.exports = {
  db: db,
  getLogin: getLogin,
  signUp: signUp,
  saveGame: saveGame,
  getGames: getGames,
};
