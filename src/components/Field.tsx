interface Field {
  num: number;
  row: number;
  col: number;
  isEditable: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isSameNum: boolean;
  isIncorrect: boolean;
  fastModeEnabled: boolean;
  fastModeNum: number;
  setSelected: Function;
  setSelectedFieldValue: Function;
  handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function Field({
  num,
  row,
  col,
  isEditable,
  isSelected,
  isHighlighted,
  isSameNum,
  isIncorrect,
  fastModeEnabled,
  fastModeNum,
  setSelected,
  setSelectedFieldValue,
  handleOnKeyDown,
}: Field) {
  const style = {
    borderBottom: row >= 2 && (row + 1) % 3 === 0 ? "3px solid #25282E" : "",
    borderRight: col >= 2 && (col + 1) % 3 === 0 ? "3px solid #25282E" : "",
    borderRadius: col === 8 && row === 8 ? "0 0 4px 0" : "",
    color: isSelected ? "#eff6ff" : isEditable ? "#0b4ee0" : "",
    fontWeight: isSelected ? "bold" : "unset",
    background: isIncorrect
      ? "#e00b32"
      : isSelected
        ? "#155dfc"
        : isSameNum
          ? "#8EC5FF"
          : isHighlighted
            ? "#D3E5FE"
            : "unset",
  };

  const handleClick = () => {
    setSelected([row, col]);

    // If fast mode enabled and fast mode active number selected set that number to selected field
    if (fastModeEnabled && fastModeNum) {
      setSelectedFieldValue(fastModeNum);
    }
  };

  return (
    <div
      style={style}
      className="w-[calc(100%/9)] aspect-square border border-gray-700 flex justify-center items-center"
      onClick={handleClick}
    >
      <input
        type="text"
        className="w-full h-full text-xl text-center text-inherit focus:caret-transparent"
        readOnly
        value={num === 0 ? "" : num}
        onKeyDown={handleOnKeyDown}
      />
    </div>
  );
}
