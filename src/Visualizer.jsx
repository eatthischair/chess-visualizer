import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ChessIcons from './ChessIcons.jsx';

var pos;
const Visualizer = () => {

 var chessSquares = [];
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 8; j++) {
      if ((i + j) % 2 === 0) {
        let id = [i, j]
        chessSquares.push(<div id={id} className='whiteSquare'
        onDragOver={(e)=> {setPos(id, e)}}
        // onDrop={(e)=> {dropEvent(e)}}
        ></div>)
      } else {
        let id = [i, j]
        chessSquares.push(<div id={id} className='blackSquare'
        onDragOver={(e)=> {setPos(id, e)}}
        ></div>)
      }
    }
  };

  const [chessBoard, setChessBoard] = useState(chessSquares);

const [currentPos, setCurrentPos] = useState([]);

function dropEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('eeeeee');
}

  const coordIntoIndex = (id) => {
    return (((id[0] * 8) - 8) + id[1]) - 1;
  }

  const IndextoId = (index) => {
     // index = index + 1;
     var j = index % 8;
     var i = (index - j) / 8;
     console.log('IJ', i + 1, j + 1, index);
     return [i + 1, j + 1]
   }

  const appendImg = (index, isWhiteSq, id) => {
    // console.log('ARGS', index, isWhiteSq, id);
    // var sqColor;
    // if (isWhiteSq) {
    //   // chessSquares[index] = <div id={id} className='whiteSquare'
    //   // onDragOver={(e)=> {setPos(id, e)}}
    //   // // onDragEnd={(e)=> {onDrop(e, id)}}
    //   // >{b.K}</div>
    //   sqColor = 'whiteSquare'

    // } else {
    //   // chessSquares[index] = <div id={id} className='blackSquare'
    //   // onDragOver={(e)=> {setPos(id, e)}}
    //   // // onDragEnd={(e)=> {onDrop(e, id)}}
    //   // >{b.K}</div>
    //   sqColor = 'blackSquare'
    // }
    // console.log('aaa', index, chessSquares[index])


    var newBoard = chessSquares.map((square, currentIndex) => {
      var newIndex = IndextoId(currentIndex);
      var newColor = isWhiteSquare(newIndex);
      console.log('NEW INDEX', newIndex, currentIndex, index)
      if (currentIndex === index) {
        return (
          <div id={newIndex} className={newColor}
      onDragOver={(e)=> {setPos(newIndex, e)}}
      // onDragEnd={(e)=> {onDrop(e, id)}}
      >{b.K}</div>
        );
      } else {
        return (
          <div id={newIndex} className={newColor}
          onDragOver={(e)=> {setPos(newIndex, e)}}
          // onDragEnd={(e)=> {onDrop(e, id)}}
          ></div>
        )
      }
    })
    console.log('newboard', newBoard);
        setChessBoard(newBoard);
  }

  const isWhiteSquare = (coords) => {
    // var isWhite;
    if ((coords[0] + coords[1]) % 2 === 0) {
      return 'whiteSquare';
    } else {
      return 'blackSquare';
    }
    // return isWhite;
  }

  const onDrop = (e, id) => {
    console.log('AAAA', pos);
    // id = id || pos || currentPos;
    // id = pos;
    setCurrentPos(id);
    e.preventDefault();
    e.stopPropagation();
    var index = coordIntoIndex(pos)
    var sqColor = isWhiteSquare(pos);
    appendImg(index, sqColor, pos);
    // console.log('eeeeE', chessBoard);
  }

  const setPos = (id, e) => {
    setCurrentPos(id);
    pos = id;
    console.log('ID', pos)
  }

  var b = {};
  b['K'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png' width='50' height='50'
  // onDragStart={(e) => dragStart(e)}
  // onDragEnter={(e) => dragEnter(e)}
  onDragEnd={(e)=> {onDrop(e, pos)}}></img>;






  return (
    <div className='chessboard'>
      {chessBoard}
      {b.K}
  </div>
  )
};

export default Visualizer;