const RenderPieces = ({pieceId, pieceElement}) => {
  //this is so when an element is dragged and dropped onto the board from the sidebar, its ID doesnt overlap with a piece already on the board

  if (pieceId.slice(1) === '64') {
    return pieceElement;
  }
};

export default RenderPieces;
