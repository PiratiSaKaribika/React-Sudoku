import { MdOutlinePlayCircleFilled } from "react-icons/md";

interface StartMenuProps {
  setDifficulty: Function;
}

function StartMenu({ setDifficulty }: StartMenuProps) {
  return (
    <div>
      <h4 className="w-full text-center mb-12 text-primary-900">
        Choose difficulty
      </h4>

      <ul className="flex gap-x-4">
        <li>
          <button
            onClick={() => setDifficulty("easy")}
            className="w-24 py-1 font-bold text-base uppercase bg-primary-600 rounded text-primary-100 shadow-1 hover:bg-primary-500"
          >
            easy
          </button>
        </li>
        <li>
          <button
            onClick={() => setDifficulty("medium")}
            className="w-24 py-1 font-bold text-base uppercase bg-primary-600 rounded text-primary-100 shadow-1 hover:bg-primary-500"
          >
            medium
          </button>
        </li>
        <li>
          <button
            onClick={() => setDifficulty("hard")}
            className="w-24 py-1 font-bold text-base uppercase bg-primary-600 rounded text-primary-100 shadow-1 hover:bg-primary-500"
          >
            hard
          </button>
        </li>
      </ul>
    </div>
  );
}

interface EndMenuProps {
  time: number;
  resetState: Function;
}

function EndMenu({ time, resetState }: EndMenuProps) {
  // Calculate and format time to display on game end
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedTime = hours
    ? hours.toString().padStart(2, "0") + ":"
    : "" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

  const handleClick = () => resetState();

  return (
    <div className="pb-2 text-center">
      <h2 className="text-primary-600 mb-2">You win!</h2>
      <h4 className="text-primary-900 mb-8">Your time is {formattedTime}</h4>

      <h5>
        <button
          className="px-6 py-2 font-bold uppercase bg-primary-600 rounded text-primary-100 shadow-1 hover:bg-primary-500"
          onClick={handleClick}
        >
          New Game
        </button>
      </h5>
    </div>
  );
}

interface PauseMenuProps {
  togglePause: Function;
}

function PauseMenu({ togglePause }: PauseMenuProps) {
  const handleClick = () => togglePause();

  return (
    <button
      onClick={handleClick}
      className="w-16 aspect-square text-primary-600 hover:text-primary-500"
    >
      <MdOutlinePlayCircleFilled />
    </button>
  );
}

interface MenuProps {
  isSolved: boolean;
  showMenu: boolean;
  showPausedMenu: boolean;
  time: number;
  setDifficulty: Function;
  togglePause: Function;
  resetState: Function;
}

export default function Menu({
  isSolved,
  showMenu,
  showPausedMenu,
  time,
  setDifficulty,
  togglePause,
  resetState,
}: MenuProps) {
  const isVisible = isSolved || showMenu || showPausedMenu;

  return isVisible ? (
    <div className="absolute left-0 top-0 pb-2 w-full aspect-square flex flex-col justify-center items-center bg-primary-100">
      {isSolved ? (
        <EndMenu time={time} resetState={resetState} />
      ) : showMenu ? (
        <StartMenu setDifficulty={setDifficulty} />
      ) : showPausedMenu ? (
        <PauseMenu togglePause={togglePause} />
      ) : null}
    </div>
  ) : null;
}
