import React, { useState, useRef } from 'react';


const indexToCoord = (index) => {
  var remainder = index % 8;
  var multiple = (index - remainder) / 8;
  return [multiple, remainder]
}

export default indexToCoord;