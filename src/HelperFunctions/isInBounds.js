const IsInBounds = (rowIndex, columnIndex) => {
  let rowInBounds = rowIndex >= 0 && rowIndex <= 7;
  let columnInBounds = columnIndex >= 0 && columnIndex <= 7;
  if (rowInBounds && columnInBounds) return true;
  return false;
};

export default IsInBounds;
