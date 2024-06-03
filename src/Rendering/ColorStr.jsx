import {isWhiteSquare} from '../utils/PureFuncs';

export const NormalString = (colorSum, matrixIndex) => {
  let color;
  if (colorSum !== 0) {
    color *= 1;
    if (colorSum > 0) {
      color = `whiteSquare${colorSum}`;
    }
    if (colorSum < 0) {
      colorSum = colorSum * -1;
      color = `blackSquare${colorSum}`;
    }
  } else {
    color = isWhiteSquare(matrixIndex);
    colorSum = 1;
  }
  return color;
};

export const NullString = (
  colorSum,
  matrixIndex,
  colorMatrix,
  colorMatrixStack,
  row,
  column,
) => {
  let color;
  if (colorMatrix && colorMatrixStack) {
    if (colorMatrix[row][column] !== colorMatrixStack[row][column]) {
      // console.log('color has changed', 'row', row, 'column', column);
      // colorMatrix[row][column] > 0
      //   ? (color = 'nullPink')
      //   : (color = 'nullBlue');
      // if (colorMatrix[row][column] === 0) color = 'nullSquare';
      color = 'nullSquare';
    } else {
      color = NormalString(colorSum, matrixIndex);
    }
  }
  return color;
};
