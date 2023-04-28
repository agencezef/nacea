export function Toggle({ toggleFunction, checked }: ToggleProps) {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        onChange={() => toggleFunction?.()}
        type="checkbox"
        value=""
        checked={checked}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
}

interface ToggleProps {
  toggleFunction?: () => void;
  checked?: boolean;
}