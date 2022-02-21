import { ChangeEvent, FormEvent, useRef, useState } from "react";

type Props = {};

const radioOptions = [
  { id: "show-all", content: "All" },
  { id: "hide-offline", content: "Online" },
  { id: "hide-online", content: "Offline" },
];

const OnlineOfflineFilter = ({}: Props) => {
  const radioRefs = useRef<HTMLInputElement[]>([]);

  const addToRefs = (element: HTMLInputElement) => {
    if (element && !radioRefs.current.includes(element))
      radioRefs.current.push(element);
  };

  return (
    <form
      onChange={(e: FormEvent) => {
        console.log(radioRefs);
      }}
    >
      <fieldset className="flex flex-col">
        {radioOptions.map((option, index) => (
          <div>
            <input
              ref={addToRefs}
              key={index}
              type="radio"
              id={option.id}
              name="filter-status"
              className="hidden group-checked:bg-red-500 peer"
              defaultChecked={index === 0}
            />
            <label
              htmlFor={option.id}
              className="relative border-2 text-gray-600 border-gray-600 rounded-md px-4 mb-2 md:w-28
              flex items-center hover:cursor-pointer
             peer-checked:bg-gray-600 peer-checked:text-gray-100 peer-checked:before:border-gray-100 peer-checked:before:border-4
              before:content-[''] before:h-3 before:w-3 before:border-2 before:border-gray-600 before:rounded-full before:mr-2
            "
            >
              {option.content}
            </label>
          </div>
        ))}
      </fieldset>
      <input type="text" placeholder="Filter by language..." />
    </form>
  );
};

export default OnlineOfflineFilter;
