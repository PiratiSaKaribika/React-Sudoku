import Timer from "./Timer";
import PauseBtn from "../ui/PauseBtn";

interface GameHeaderProps {
  difficulty: string | null;
  showMenu: boolean;
  showPausedMenu: boolean;
  isSolved: boolean;
  setTime: Function;
  togglePause: Function;
}

export default function GameHeader({
  difficulty,
  showMenu,
  showPausedMenu,
  isSolved,
  setTime,
  togglePause,
}: GameHeaderProps) {
  return (
    <div className="w-[calc(60%-32px)] flex justify-between items-end mb-4 phone:w-full">
      <div>
        <p className="text-xs font-bold text-gray-500 mb-2">DIFFICULTY</p>
        <h6 className={`uppercase ${!difficulty ? "invisible" : ""}`}>
          {difficulty ? difficulty : "NA"}
        </h6>
      </div>

      <div className="flex items-center gap-x-2">
        <Timer
          isTimerOn={!showMenu && !showPausedMenu}
          isSolved={isSolved}
          setStoreTime={setTime}
        />

        <PauseBtn handler={togglePause} />
      </div>
    </div>
  );
}
