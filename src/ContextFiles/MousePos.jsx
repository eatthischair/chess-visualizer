//mouse position
//could refactor to Zustand, but i have no intentions of scaling and it works perfectly. attempts to use useRef (lack of global scope) or useReducer (causes rerenders) only caused hours of problems

var currentHoverPosition;
export const setPos = id => {
  console.log('setpos', id);
  currentHoverPosition = id;
};
export const getPos = () => {
  console.log('getpos', currentHoverPosition);
  return currentHoverPosition;
};
