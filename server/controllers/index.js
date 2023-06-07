const {
  getCurrentLogin,
  signUpUser,
  saveGameToDb,
  getGamesFromDb,
} = require("./loginAndSignup");

module.exports = {
  getCurrentLogin: getCurrentLogin,
  signUpUser: signUpUser,
  saveGameToDb: saveGameToDb,
  getGamesFromDb: getGamesFromDb,
};
