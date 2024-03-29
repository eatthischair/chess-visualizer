const toMatrixCoords = (notationCoords) => {
  let yIndex = notationCoords.charCodeAt(0) - 97;
  let xIndex = Math.abs(notationCoords[1] - 8);
  return [xIndex, yIndex];
};

export default toMatrixCoords;
