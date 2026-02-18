import { MdFlashOn } from "react-icons/md";

interface ToggleBtnProps {
  handleClick: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ToggleBtn({ handleClick }: ToggleBtnProps) {
  return (
    <div className="float-right w-8 h-4 relative mt-1">
      <input
        type="checkbox"
        className="w-full h-full opacity-0 peer"
        onChange={handleClick}
      />

      <button className="w-full h-full bg-neutral-300 border border-neutral-300 rounded-xl absolute left-0 top-0 pointer-events-none peer-checked:[&>span]:left-4 peer-checked:bg-blue-500">
        <span className="block absolute left-0 top-0 h-full aspect-square rounded-full bg-white transition-all duration-50 ease-in-out p-px">
          <MdFlashOn className="text-gray-600" />
        </span>
      </button>
    </div>
  );
}
