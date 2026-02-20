import type { Position, Sudoku } from "../types";

// Components
import Field from "./Field";
import Menu from "./Menu";

// UI Components
import ToggleBtn from "../ui/ToggleBtn";

interface BoardProps {
  playerSudoku: Sudoku;
  selected: Position | [];
  incorrectFieldsArr: Position[];
  fastModeEnabled: boolean;
  fastModeNum: number;
  showMenu: boolean;
  showPausedMenu: boolean;
  isSolved: boolean;
  time: number;
  getIsEditable: Function;
  setSelected: Function;
  setSelectedFieldValue: Function;
  setDifficulty: Function;
  togglePause: Function;
  resetState: Function;
  // handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  toggleFastMode: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Board({
  playerSudoku,
  selected,
  incorrectFieldsArr,
  fastModeEnabled,
  fastModeNum,
  showMenu,
  showPausedMenu,
  isSolved,
  time,
  getIsEditable,
  setSelected,
  setSelectedFieldValue,
  setDifficulty,
  togglePause,
  resetState,
  toggleFastMode,
}: BoardProps) {
  const getIsHighlighted = (pos: Position) => {
    if (!selected || !selected.length) return false;
    const [r, c] = pos;

    const rStart = selected[0] - (selected[0] % 3); // 3x3 top border
    const rEnd = rStart + 2; // 3x3 bottom border

    const cStart = selected[1] - (selected[1] % 3); // 3x3 left border
    const cEnd = cStart + 2; // 3x3 right border

    const isInRow = r === selected[0];
    const isInCol = c === selected[1];
    const isIn3x3 = r >= rStart && r <= rEnd && c >= cStart && c <= cEnd;

    return isInRow || isInCol || isIn3x3;
  };

  const getIsSameNum = (num: number): boolean => {
    if (!selected || selected.length !== 2 || !num) return false; // Return false if no field is selected

    const selectedNum = playerSudoku[selected[0]][selected[1]];
    return num === selectedNum;
  };

  const getIsSelected = (pos: Position) => {
    const [r, c] = pos;

    return (
      selected &&
      selected.length === 2 &&
      selected[0] === r &&
      selected[1] === c
    );
  };

  const getIsIncorrect = (pos: Position) => {
    return incorrectFieldsArr.find(
      (incorrectPos) =>
        incorrectPos[0] === pos[0] && incorrectPos[1] === pos[1],
    )
      ? true
      : false;
  };

  return (
    <div className="relative">
      <Menu
        isSolved={isSolved}
        showMenu={showMenu}
        showPausedMenu={showPausedMenu}
        time={time}
        setDifficulty={setDifficulty}
        togglePause={togglePause}
        resetState={resetState}
      />

      <div className="w-full flex flex-wrap border-gray-700 border-t-3 border-l-3 rounded">
        {playerSudoku
          ? playerSudoku.map((row, r) =>
              row.map((col, c) => (
                <Field
                  key={String(r) + String(c)}
                  num={col}
                  row={r}
                  col={c}
                  isEditable={getIsEditable([r, c])}
                  isHighlighted={getIsHighlighted([r, c])}
                  isSameNum={getIsSameNum(col)}
                  isSelected={getIsSelected([r, c])}
                  isIncorrect={getIsIncorrect([r, c])}
                  fastModeEnabled={fastModeEnabled}
                  fastModeNum={fastModeNum}
                  setSelected={setSelected}
                  setSelectedFieldValue={setSelectedFieldValue}
                />
              )),
            )
          : null}
      </div>

      <ToggleBtn handleClick={toggleFastMode} />
    </div>
  );
}
