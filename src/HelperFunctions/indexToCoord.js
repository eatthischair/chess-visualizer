const indexToCoord = (index) => {
  let remainder = index % 8;
  let multiple = (index - remainder) / 8;
  return [multiple, remainder];
};

export default indexToCoord;
