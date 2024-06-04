import {setPos} from '../ContextFiles/State';

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
