import colorGrid from "./ColorGrid";

const ColorOptions = ({
  RadioButtons,
  hexUpdate,
  renderColorPalletes,
  color1,
  colorChange1,
  color2,
  colorChange2,
  renderRadioButtons,
  hexObj,
}) => {
  let hexObjArr = Object.entries(hexObj);
  let concatted = [];
  for (let i = 0; i < hexObjArr.length; i += 2) {
    concatted.push(hexObjArr[i].concat(hexObjArr[i + 1]));
  }

  let blocks = concatted.map((row) => {
    return colorGrid(row[1], row[3]);
  });

  let block1 = blocks.slice(0, 2);
  let block2 = blocks.slice(2, 9);
  let block3 = blocks.slice(9, blocks.length);

  return (
    <div class="flex flex-initial justify-center gap-x-32">
      <button
        className="flex flex-initial btn-secondary w-32 "
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Color Options
      </button>
      <dialog id="my_modal_3" className="modal grid grid-cols-3">
        <div class="modal-box flex flex-col bg-base-200 self-start text-xs m-0">
          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title bg-base-200 text-primary-content peer-checked:bg-primary peer-checked:text-primary-content text-sm w-64 h-12">
              Light and Dark Square Colors
            </div>
            <div className="collapse-content bg-base-200 text-primary-content peer-checked:bg-primary peer-checked:text-primary-content w-64 min-w-64 ">
              {block1}
              {RadioButtons("lightSquare", 0, hexUpdate)}
              {RadioButtons("darkSquare", 0, hexUpdate)}
              {renderColorPalletes(color1, colorChange1, color2, colorChange2)}
            </div>
          </div>

          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
              White's Square Colors
            </div>
            <div className="collapse-content bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
              {block2}
              {renderRadioButtons("whiteSquare", hexUpdate)}
              {renderColorPalletes(color1, colorChange1, color2, colorChange2)}
            </div>
          </div>

          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
              Black's Square Colors
            </div>
            <div className="collapse-content bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
              {block3}
              {renderRadioButtons("blackSquare", hexUpdate)}
              {renderColorPalletes(color1, colorChange1, color2, colorChange2)}
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop w-screen">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ColorOptions;
