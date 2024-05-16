import {useState, useEffect} from 'react';

const usePreviousColorMatrix = colorMatrix => {
  const [colorMatrixStack, setColorMatrixStack] = useState([null]);

  useEffect(() => {
    setColorMatrixStack(prevStack => {
      const newStack = [...prevStack, colorMatrix];
      if (newStack.length >= 3) {
        newStack.shift(); // Remove the oldest entry if the stack size exceeds 2
      }
      return newStack;
    });
  }, [colorMatrix]);

  return colorMatrixStack;
};

export default usePreviousColorMatrix;
