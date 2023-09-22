const ColorOptions = ({RadioButtons, hexUpdate, showWheel, renderColorPalletes, color1, colorChange1, color2, colorChange2, renderRadioButtons }) => {

  return (

    <div class="flex flex-initial justify-center gap-x-32">
    <button
      className="flex flex-initial btn-primary w-32 "
      onClick={() => document.getElementById("my_modal_3").showModal()}
    >
      Color Options
    </button>
    <dialog
      id="my_modal_3"
      className="modal border-amber-300 border-2 grid grid-cols-3"
    >
      <div class="modal-box flex flex-col bg-base-200 border-amber-300 border-2 self-start text-xs m-0">
        <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title bg-base-200 text-primary-content peer-checked:bg-primary peer-checked:text-primary-content text-sm w-64 h-12">
            Light and Dark Square Colors
          </div>
          <div className="collapse-content bg-base-200 text-primary-content peer-checked:bg-primary peer-checked:text-primary-content w-64 min-w-64 ">
            {RadioButtons("lightSquare", 0, hexUpdate)}
            {RadioButtons("darkSquare", 0, hexUpdate)}
            {showWheel
              ? renderColorPalletes(
                  color1,
                  colorChange1,
                  color2,
                  colorChange2
                )
              : ""}
          </div>
        </div>

        <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
            White's Square Colors
          </div>
          <div className="collapse-content bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
            {renderRadioButtons("whiteSquare", hexUpdate)}
            {showWheel
              ? renderColorPalletes(
                  color1,
                  colorChange1,
                  color2,
                  colorChange2
                )
              : ""}
          </div>
        </div>

        <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
            Black's Square Colors
          </div>
          <div className="collapse-content bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-sm">
            {renderRadioButtons("blackSquare", hexUpdate)}
            {showWheel
              ? renderColorPalletes(
                  color1,
                  colorChange1,
                  color2,
                  colorChange2
                )
              : ""}
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop w-screen">
        <button>Close</button>
      </form>
    </dialog>
    </div>
  )
}

export default ColorOptions