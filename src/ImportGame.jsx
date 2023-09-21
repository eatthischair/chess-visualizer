const ImportGame = ({pgnInput, readPgn, setPgnImported}) => {

  return (

    <div>
  <button
          className="flex flex-initial btn-primary w-32"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Import Game
        </button>
        <dialog id="my_modal_2" className="modal">
          <div class="modal-box flex flex-col bg-base-200 w-full border-amber-300 border-2">
            <textarea
              class="flex w-full text-black h-32 min-h-32 max-h-32 border-amber-300 border-2 text-sm bg-white"
              onChange={(e) => pgnInput(e)}
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
            ></textarea>
            <button
              class="flex btn-primary w-32 min-w-32 max-w-32 border-amber-300 border-2 place-self-end text-center"
              onClick={() => readPgn()}
              type="button"
            >
              Render Game
            </button>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button onClick={() => setPgnImported(false)}>Close</button>
          </form>
        </dialog>
      </div>
  )
}

export default ImportGame