import React, { useState, useRef } from 'react';

const makeEmptyMatrix = () => {
  var positionArray = [];
  for (var i = 0; i < 8; i++) {
    var pieceArray = [];
    for (var j = 0; j < 8; j++) {
      pieceArray.push(0);
      }
      positionArray.push(pieceArray);
    };
    return positionArray;
}

export default makeEmptyMatrix;