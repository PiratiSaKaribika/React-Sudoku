import { BiSolidEraser } from "react-icons/bi";
import { MdOutlineUndo, MdClear, MdCheck } from "react-icons/md";

interface ControlsBlockerProps {
  controlsDisabled: boolean;
}
// Block user from clicking on controls when disabled (when menu is shown)
function ControlsBlocker({ controlsDisabled }: ControlsBlockerProps) {
  return controlsDisabled ? (
    <div className="absolute left-0 top-0 w-full h-full opacity-0"></div>
  ) : null;
}

interface NumpadButtonProps {
  num: number;
  tabIndex: number;
  isActiveFastModeNum: boolean;
  handleClick: Function;
}
function NumpadButton({
  num,
  tabIndex,
  isActiveFastModeNum,
  handleClick,
}: NumpadButtonProps) {
  return (
    <button
      className={`w-[calc((100%-16px)/3)] aspect-2/1 rounded-lg bg-primary-250 border border-primary-200 shadow-2 ${isActiveFastModeNum ? "bg-primary-300" : ""} phone:aspect-auto phone:w-full`}
      onClick={(e) => handleClick(e, num)}
      tabIndex={tabIndex}
    >
      <h3 className="text-primary-800">{num}</h3>
    </button>
  );
}

interface ControlsProps {
  controlsDisabled: boolean;
  deselect: Function;
  setSelectedFieldValue: Function;
  eraseSelected: Function;
  resetSudoku: Function;
  validateSudoku: Function;
  undoMove: Function;
  setFastModeNum: Function;
  fastModeEnabled: boolean;
  fastModeNum: number;
}
export default function Controls({
  controlsDisabled,
  deselect,
  setSelectedFieldValue,
  eraseSelected,
  resetSudoku,
  validateSudoku,
  undoMove,
  setFastModeNum,
  fastModeEnabled,
  fastModeNum,
}: ControlsProps) {
  const numpadValuesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Values of numpad buttons to map over with
  const tabIndex = controlsDisabled ? -1 : 0; // Make buttons unfocusable if controls are disabled

  const handleNumpadClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    newValue: number,
  ) => {
    e.preventDefault();

    // if fast mode is on - set active number to numpad number and deselect the selected field
    if (fastModeEnabled) {
      setFastModeNum(newValue);
      deselect();
      return; // prevent from setting the selected value
    }

    // if not, set the selected field to numpad number
    setSelectedFieldValue(newValue);
  };

  const handleEraseClick = () => eraseSelected();

  const handleResetSudoku = () => resetSudoku();

  const handleValidateSudoku = () => validateSudoku();

  const handleUndo = () => undoMove();

  return (
    <div className="relative min-w-[40%] h-full [&_button]:cursor-pointer [&_button]:hover:bg-blue-100 [&_button]:active:shadow-inline-1 [&_h6]:font-bold phone:flex phone:flex-col-reverse phone:gap-y-4">
      <ControlsBlocker controlsDisabled={controlsDisabled} />

      <div className="flex items-center gap-x-4 mb-16 tablet:gap-x-2 phone:gap-x-0 phone:justify-between phone:mb-0 phone:*:w-[15%] phone:*:p-4 phone-sm:*:w-[18%] phone-sm:*:p-3">
        <button
          className="aspect-square w-full p-6 rounded-full bg-primary-250 text-primary-900 tablet:p-5"
          tabIndex={tabIndex}
        >
          <MdOutlineUndo color="inherit" onClick={handleUndo} />
        </button>

        <button
          className="aspect-square w-full p-6 rounded-full bg-primary-250 text-primary-900 tablet:p-5"
          onClick={handleEraseClick}
          tabIndex={tabIndex}
        >
          <BiSolidEraser color="inherit" />
        </button>

        <button
          className="aspect-square w-full p-6 rounded-full bg-primary-250 text-primary-900 tablet:p-5"
          onClick={handleResetSudoku}
          tabIndex={tabIndex}
        >
          <MdClear color="inherit" />
        </button>

        <button
          className="aspect-square w-full p-6 rounded-full bg-primary-250 text-primary-900 tablet:p-5"
          onClick={handleValidateSudoku}
          tabIndex={tabIndex}
        >
          <MdCheck color="inherit" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 phone:flex-nowrap phone-sm:gap-1">
        {numpadValuesArr.map((value) => (
          <NumpadButton
            key={value}
            num={value}
            tabIndex={tabIndex}
            isActiveFastModeNum={fastModeEnabled && fastModeNum === value}
            handleClick={handleNumpadClick}
          />
        ))}
      </div>
    </div>
  );
}
