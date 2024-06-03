import GrabTitle from './GameReader/GrabTitle';
import {selectedGames} from './utils/selectedGames.js';

const LeftSideBar = ({readPgn}) => {
  console.log('leftsidebar', readPgn);
  return (
    <div className="flex justify-center h-[520px] m-0">
      <div className="w-64 h-[520px] overflow-x-clip overflow-y-scroll">
        <div className="flex flex-row">
          <div className="flex justify-center place-self-center basis-2 grow text-sm leading-3 indent-0 h-8 mt-4 font-semibold text-slate-100">
            Selected Games
          </div>
        </div>
        {selectedGames.map((game, index) => (
          <div
            key={game}
            onClick={() => {
              readPgn(index);
            }}
            className="btn-tertiary shadow-md">
            {GrabTitle(game)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
