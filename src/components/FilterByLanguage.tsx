import { ChangeEvent } from "react";
import { ACTIONS } from "../helpers/advisorsReducer";

type Props = {
  dispatch: ({ type, payload }: { type: string; payload: any }) => void;
};

const FilterByLanguage = ({ dispatch }: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Filter by language..."
        onChange={(event) =>
          dispatch({ type: ACTIONS.FILTER_BY_LANGUAGE, payload: { event } })
        }
        className="w-full h-8 p-4 rounded-lg outline-none bg-gray-100 text-gray-600"
      />
    </div>
  );
};

export default FilterByLanguage;
