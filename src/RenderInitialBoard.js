import isWhiteSquare from './HelperFunctions/isWhiteSquare.jsx';
import setPos from './Visualizer.jsx';

const RenderInitialBoard = () => {
  var blankBoard = [];
  var positionArray = [];
  for (var i = 0; i < 8; i++) {
    var pieceArray = [];
    for (var j = 0; j < 8; j++) {
      let id = [i, j]
      var color = isWhiteSquare(id);
      blankBoard.push(<div id={id} className={color}
      onDragOver={()=> {setPos(id)}}
      ></div>);
      pieceArray.push(0);
      }
      positionArray.push(pieceArray);
    };
    return [blankBoard, positionArray];
}

export default RenderInitialBoard;