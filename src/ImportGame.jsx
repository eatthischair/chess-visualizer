const ImportGame = ({ pgnInput, readPgn, pgnValid }) => {
  return (
    <div>
      <button
        className="flex flex-initial btn-secondary w-32 bg-inherit"
        onClick={() => document.getElementById("my_modal_2").showModal()}
        >
        Import Game
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col bg-base-200 w-full">
        <div>{!pgnValid ? <div className='text-red-600 text-sm'>Cannot parse PGN</div> : ''}</div>
          <textarea
            className="flex w-full text-black h-32 min-h-32 max-h-32 border-amber-300 border-2 text-sm bg-white"
            onChange={(e) => pgnInput(e)}
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
          ></textarea>
          <button
            className="flex btn-secondary w-32 min-w-32 max-w-32 place-self-end text-center"
            onClick={() => readPgn()}
            type="button"
          >
            Render Game
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>

        </form>
      </dialog>
    </div>
  );
};

export default ImportGame;
