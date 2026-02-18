import { MdOutlinePauseCircle } from "react-icons/md";

interface PauseBtnProps {
  handler: Function;
}

export default function PauseBtn({ handler }: PauseBtnProps) {
  const handleClick = () => handler();

  return (
    <button onClick={handleClick} className="w-6 h-6 text-gray-600">
      <MdOutlinePauseCircle />
    </button>
  );
}
