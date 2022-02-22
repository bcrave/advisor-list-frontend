import { FormEvent } from "react";

type Props = {
  handleOnlineStatusChange: (e: FormEvent) => void;
};

const radioOptions = [
  { id: "show-all", content: "All" },
  { id: "hide-offline", content: "Online" },
  { id: "hide-online", content: "Offline" },
];

const FilterByStatus = ({ handleOnlineStatusChange }: Props) => {
  return (
    <fieldset
      className="flex justify-between md:flex-row mb-6 md:mb-0"
      onChange={handleOnlineStatusChange}
    >
      {radioOptions.map((option, index) => (
        <div>
          <input
            key={index}
            type="radio"
            id={option.id}
            name="filter-status"
            className="hidden group-checked:bg-red-500 peer"
            defaultChecked={index === 0}
          />
          <label
            htmlFor={option.id}
            className="relative border-2 text-gray-600 border-gray-600 rounded-md px-4 md:w-28
                flex items-center hover:cursor-pointer mx-1
               peer-checked:bg-gray-600 peer-checked:text-gray-100 peer-checked:before:border-gray-100 peer-checked:before:border-4
                before:content-[''] before:h-3 before:w-3 before:border-2 before:border-gray-600 before:rounded-full before:mr-2
              "
          >
            {option.content}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default FilterByStatus;
