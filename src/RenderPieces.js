const RenderPieces = ({ pieceId, pieceElement }) => {
  if (pieceId.slice(1) === "64") {
    return pieceElement;
  }
};

export default RenderPieces;
