import React, { useState, useRef, useEffect } from 'react';

const toMatrixCoords = (notationCoords) => {
  let yIndex = notationCoords.charCodeAt(0) - 97 // a = 0 and h = 8
  let xIndex = Math.abs(notationCoords[1] - 8);
  let matrixCoords = [xIndex, yIndex]
  // console.log('matrixcoords', notationCoords)
  return matrixCoords;
}

export default toMatrixCoords;