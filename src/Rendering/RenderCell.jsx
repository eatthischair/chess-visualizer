import {setPos} from '../ContextFiles/MousePos';

export const RenderCell = ({keyString, color, piece, matrixIndex}) => {
  return (
    <div
      key={keyString}
      id={keyString}
      className={`cell ${color}`}
      onDragOver={() => {
        setPos(matrixIndex);
      }}>
      {piece}
    </div>
  );
};
