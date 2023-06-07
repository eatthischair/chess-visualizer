const db = require("./database");

const getLogin = (userId) => {
  console.log("USER ID IN getLogin", userId);
  return db
    .query(
      // `select * from users where user_id IN (select user2_id from friends where user1_id = ${userId})`
      // `select * from users where "username" = ${userId}`
      `select * from users WHERE username = '${userId}'`
    )
    .catch((err) => err);
  // `select * from users where user_id IN (select user2_id from friends where user1_id = ${userId})`
};

const signUp = (username, hashedPw) => {
  console.log("in db signup", username, hashedPw);
  return db
    .query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPw]
    )
    .catch((err) => console.log("err in db signup", err));
};

const saveGame = (pgn, user) => {
  return db
    .query("INSERT INTO games (pgn, username) VALUES ($1, $2)", [pgn, user])
    .catch((err) => console.log("err in saving game", err));
};

const getGames = (user) => {
  console.log("geetgames user", user);
  return db
    .query(`select pgn from games where username = '${user}'`)
    .catch((err) => console.log("err in getting games", err));
};

module.exports = {
  getLogin: getLogin,
  signUp: signUp,
  saveGame: saveGame,
  getGames: getGames,
};
