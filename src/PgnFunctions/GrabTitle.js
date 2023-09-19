const GrabTitle = (pgn) => {
  let whiteIndex = pgn.indexOf("White");
  let blackIndex = pgn.indexOf("Black");

  if (whiteIndex !== -1) {
    let sliced = pgn.slice(whiteIndex + 7);
    let endIndex = sliced.indexOf(`]`);
    var whitePlayerName = pgn.slice(
      whiteIndex + 7,
      whiteIndex + 7 + endIndex - 1
    );
  }

  if (blackIndex !== -1) {
    let sliced = pgn.slice(blackIndex + 7);
    let endIndex = sliced.indexOf(`]`);
    var blackPlayerName = pgn.slice(
      blackIndex + 7,
      blackIndex + 7 + endIndex - 1
    );
  }
  return [whitePlayerName, blackPlayerName];
};

export default GrabTitle;
