import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardStep,
  faForwardFast,
} from '@fortawesome/free-solid-svg-icons';
import useKeyboardNavigation from '../CustomHooks/UseKeyboardNavigation';

const BottomBar = ({
  currentPgn,
  setCurrentBoard,
  getNextBoard,
  getPreviousBoard,
  getLastBoard,
  getFirstBoard,
}) => {
  //arrow key event listeners
  const first = () => {
    setCurrentBoard(getFirstBoard());
  };

  const next = () => {
    setCurrentBoard(getNextBoard());
  };
  const prev = () => {
    setCurrentBoard(getPreviousBoard());
  };
  const last = () => {
    setCurrentBoard(getLastBoard());
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

export default BottomBar;
