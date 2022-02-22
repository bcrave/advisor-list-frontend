import { ChangeEvent } from "react";

type Props = {
  handleLanguageChange: (e: ChangeEvent) => void;
};

const FilterByLanguage = ({ handleLanguageChange }: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Filter by language..."
        onChange={handleLanguageChange}
        className="w-full h-8 p-4 rounded-lg outline-none bg-gray-100 text-gray-600"
      />
    </div>
  );
};

export default FilterByLanguage;
