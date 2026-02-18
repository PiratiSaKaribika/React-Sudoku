// Components
import GameHeader from "./GameHeader";
import Board from "./Board";
import Controls from "./Controls";

// Types
import type { Difficulty, Position, StoreState } from "../types";

interface Game {
  state: StoreState;
  dispatch: Function;
}

export default function Game({ state, dispatch }: Game) {
  const {
    bkPlayerSudoku,
    playerSudoku,
    selected,
    incorrectFieldsArr,
    fastModeEnabled,
    fastModeNum,
    isSolved,
    difficulty,
    isPaused,
    time,
  } = state;

  const showMenu = isSolved || !difficulty;
  const showPausedMenu = isPaused;

  // FUNCTIONS AND HANDLERS

  // Get is field editable by position
  const getIsEditable = (pos: Position): boolean =>
    bkPlayerSudoku[pos[0]][pos[1]] === 0;

  // Set selected Field
  const setSelected = (pos: Position): void =>
    dispatch({ type: "SELECT_FIELD", payload: pos });

  // Set selected field value
  const setSelectedFieldValue = (newValue: number): void => {
    dispatch({ type: "SET_SELECTED_FIELD_VALUE", payload: newValue });
  };

  // Set game difficulty
  const setDifficulty = (difficulty: Difficulty): void =>
    dispatch({ type: "START_SUDOKU", payload: difficulty });

  // Erase selected field
  const eraseSelected = (): void => setSelectedFieldValue(0);

  // Reset sudoku to initial state
  const resetSudoku = (): void => dispatch({ type: "RESET_SUDOKU" });

  // Validate player progress and highlight wrong inputs
  const validateSudoku = (): void =>
    dispatch({ type: "VALIDATE_PLAYER_FIELDS" });

  // Undo one move
  const undoMove = (): void => dispatch({ type: "UNDO_MOVE" });

  // Toggle fast mode on/off
  const toggleFastMode = (): void => dispatch({ type: "TOGGLE_FASTMODE" });

  // Set fast mode number value
  const setFastModeNum = (num: number): void =>
    dispatch({ type: "SET_FASTMODE_NUM", payload: num });

  const setTime = (time: number): void =>
    dispatch({ type: "SET_TIME", payload: time });

  const togglePause = (): void => dispatch({ type: "TOGGLE_PAUSE" });

  const resetState = (): void => dispatch({ type: "RESET_STATE" });

  // Handle keyboard input
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Return if no field is selected
    if (!selected || !selected.length) return;

    // Handle erasing field
    if (e.code === "Backspace") eraseSelected();

    // Return if key is not 1-9
    if (!e.code.startsWith("Digit") || e.code === "Digit0") return;

    const newVal = Number(e.key);

    if (fastModeEnabled) {
      setFastModeNum(newVal);
    }

    setSelectedFieldValue(newVal);
  };

  return (
    <div className="w-240 mx-auto tablet:max-w-[95%] phone:max-w-[90%] phone-sm:max-w-[95%]">
      <GameHeader
        difficulty={difficulty}
        showMenu={showMenu}
        showPausedMenu={showPausedMenu}
        isSolved={isSolved}
        setTime={setTime}
        togglePause={togglePause}
      />

      <div className="w-full flex gap-x-8 phone:flex-col phone:gap-x-0 phone:gap-y-4">
        <Board
          playerSudoku={playerSudoku}
          selected={selected}
          incorrectFieldsArr={incorrectFieldsArr}
          fastModeEnabled={fastModeEnabled}
          fastModeNum={fastModeNum}
          showMenu={showMenu}
          showPausedMenu={showPausedMenu}
          isSolved={isSolved}
          time={time}
          getIsEditable={getIsEditable}
          setSelected={setSelected}
          setSelectedFieldValue={setSelectedFieldValue}
          setDifficulty={setDifficulty}
          togglePause={togglePause}
          resetState={resetState}
          handleOnKeyDown={handleOnKeyDown}
          toggleFastMode={toggleFastMode}
        />

        <Controls
          controlsDisabled={isSolved || showMenu || showPausedMenu}
          setSelectedFieldValue={setSelectedFieldValue}
          eraseSelected={eraseSelected}
          resetSudoku={resetSudoku}
          validateSudoku={validateSudoku}
          undoMove={undoMove}
          setFastModeNum={setFastModeNum}
          fastModeEnabled={fastModeEnabled}
          fastModeNum={fastModeNum}
        />
      </div>
    </div>
  );
}
