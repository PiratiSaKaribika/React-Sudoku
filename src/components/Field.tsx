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
}: Field) {
  // Dynamically calculate tailwind classes to apply
  const dynamicTwClassNamesArr = [
    row >= 2 && (row + 1) % 3 === 0 ? "border-b-[3px] border-gray-800" : "", // border bottom
    col >= 2 && (col + 1) % 3 === 0 ? "border-r-[3px] border-gray-800" : "", // border right
    col === 8 && row === 8 ? "rounded-br" : "", // border radius
    isSelected ? "text-primary-100" : isEditable ? "text-primary-700" : "", // color
    isSelected ? "font-bold" : "", // font weight,
    isIncorrect // background color
      ? "bg-incorrect"
      : isSelected
        ? "bg-primary-600"
        : isSameNum || (fastModeEnabled && fastModeNum === num && num !== 0)
          ? "bg-primary-300"
          : isHighlighted
            ? "bg-primary-250"
            : "bg-unset",
  ];
  const dynamicTwClassNames = dynamicTwClassNamesArr.join(" ");

  const handleClick = () => {
    setSelected([row, col]);

    // If fast mode enabled and fast mode active number selected set that number to selected field
    if (fastModeEnabled && fastModeNum) {
      setSelectedFieldValue(fastModeNum);
    }
  };

  return (
    <div
      className={`w-[calc(100%/9)] aspect-square border border-gray-700 flex justify-center items-center ${dynamicTwClassNames}`}
      onClick={handleClick}
    >
      <input
        type="text"
        className="w-full h-full text-xl text-center text-inherit focus:caret-transparent"
        readOnly
        value={num === 0 ? "" : num}
      />
    </div>
  );
}
