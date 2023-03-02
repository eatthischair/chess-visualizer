import React, { useState, useRef } from 'react';


const isWhiteSquare = (coords) => {
  if ((coords[0] + coords[1]) % 2 === 0) {
    return 'whiteSquare';
  } else {
    return 'blackSquare';
  }
};

export default isWhiteSquare;