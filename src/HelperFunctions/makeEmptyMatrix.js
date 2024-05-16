const makeEmptyMatrix = () => {
  let emptyMatrix = [];
  for (var i = 0; i < 8; i++) {
    let zeros = [];
    for (var j = 0; j < 8; j++) {
      zeros.push(0);
    }
    emptyMatrix.push(zeros);
  }
  return emptyMatrix;
};

const emptyMatrix = makeEmptyMatrix();

export default emptyMatrix;
