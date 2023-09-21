import { react, useState } from "react";

const Sidebar = ( {
  showPieceElements,
  pieceObj,
  RenderPieces,
  setInitialBoard,
  clearBoard,
  setShowPieceElements,
  setWhiteCtrlOn,
  whiteCtrlOn,
  setBlackCtrlOn,
  blackCtrlOn,
  setBoardIsFlipped,
  boardIsFlipped
}
) => {
  return (
    <div class="flex w-64 h-[400px] border-2 border-red-50">
      {showPieceElements ? (
        <div
          className="pieceDiv"
          class="flex flex-wrap h-[200px] w-66 overflow-scroll overflow-y-scroll"
        >
          {Object.keys(pieceObj).map((pieceId, index) => {
            return (
              <RenderPieces
                pieceId={pieceId}
                pieceElement={Object.entries(pieceObj)[index][1]}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        <li>
          <button
            class="btn-secondary"
            onClick={() => {
              setInitialBoard();
            }}
          >
            Starting Position
          </button>
        </li>
        <li>
          <button class="btn-secondary" onClick={() => clearBoard()}>
            {" "}
            Clear Board
          </button>
        </li>
        <li>
          <button
            class="btn-secondary"
            onClick={() => setShowPieceElements(!showPieceElements)}
          >
            Add Pieces
          </button>
        </li>
        <li>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text"> Disable White Square Ctrl</span>
              <input
                type="checkbox"
                value=""
                className="toggle toggle-primary"
                onClick={() => setWhiteCtrlOn(!whiteCtrlOn)}
              />
            </label>
          </div>
        </li>
        <li>
          <div className="form-control w-52">
            <label className="cursor-pointer label ">
              <span className="label-text">Disable Black Square Ctrl</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                onClick={() => {
                  setBlackCtrlOn(!blackCtrlOn);
                }}
              />
            </label>
          </div>
        </li>
        <li>
          <button
            class="btn-primary"
            onClick={() => setBoardIsFlipped(!boardIsFlipped)}
            type="button"
          >
            Flip Board
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
