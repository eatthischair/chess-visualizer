export const makeEmptyMatrix = () => {
  let matrix = [];
  for (var i = 0; i < 8; i++) {
    let zeros = [];
    for (var j = 0; j < 8; j++) {
      zeros.push(0);
    }
    matrix.push(zeros);
  }
  console.log('MATRIX', matrix);
  return matrix;
};

export const emptyMatrix = makeEmptyMatrix();
