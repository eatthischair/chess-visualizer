import {useRef} from 'react';

export const UseMousePosition = () => {
  const currentHoverPosition = useRef(null);

  const setPos = id => {
    currentHoverPosition.current = id;
  };
  const getPos = () => {
    return currentHoverPosition.current;
  };

  return {setPos, getPos};
};
