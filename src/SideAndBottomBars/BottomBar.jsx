import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardStep,
  faForwardFast,
} from '@fortawesome/free-solid-svg-icons';
import {
  getNextBoard,
  getPreviousBoard,
  getLastBoard,
  getFirstBoard,
} from '../ContextFiles/State';
import useKeyboardNavigation from '../CustomHooks/UseKeyboardNavigation';
import {reducer, initialState} from '../ContextFiles/Reducer';
import {useReducer} from 'react';
import {initialBoard} from '../utils/Constants.js';

export const BottomBar = ({currentPgn, setCurrentBoard}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //arrow key event listeners
  const first = () => {
    dispatch({type: 'RESET_MOVE_NUM', payload: -1});
    setCurrentBoard(initialBoard);
  };

  const next = () => {
    console.log('heh', dispatch({type: 'GET_NEXT_BOARD', payload: -1}));

    setCurrentBoard(getNextBoard());
  };
  const prev = () => {
    setCurrentBoard(getPreviousBoard());
  };
  const last = () => {
    let lastBoard = getLastBoard();
    if (lastBoard) setCurrentBoard(getLastBoard());
  };
  useKeyboardNavigation(next, prev, last, first);

  return (
    <div>
      {currentPgn ? (
        <div className="flex flex-initial justify-center gap-x-32 text-gray-700">
          <div onClick={() => first()}>
            <FontAwesomeIcon icon={faBackwardFast} />
          </div>
          <div onClick={() => prev()}>
            <FontAwesomeIcon icon={faBackwardStep} />
          </div>
          <div onClick={() => next()}>
            <FontAwesomeIcon icon={faForwardStep} />
          </div>
          <div onClick={() => last()}>
            <FontAwesomeIcon icon={faForwardFast} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
