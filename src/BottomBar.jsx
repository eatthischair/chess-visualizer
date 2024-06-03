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
} from './ContextFiles/BigFunction';
import useKeyboardNavigation from './CustomHooks/UseKeyboardNavigation';

export const BottomBar = ({currentPgn, setCurrentBoard}) => {
  //arrow key event listeners
  const first = () => {
    let firstBoard = getFirstBoard();
    if (firstBoard) setCurrentBoard(firstBoard);
  };
  const next = () => {
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
