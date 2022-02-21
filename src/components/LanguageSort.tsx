import { ChangeEvent } from "react";

type Props = {
  handleLanguageChange: (e: ChangeEvent) => void;
};

const LanguageSort = ({ handleLanguageChange }: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Filter by language..."
        onChange={handleLanguageChange}
      />
    </div>
  );
};

export default LanguageSort;
