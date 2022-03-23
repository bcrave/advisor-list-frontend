import { ChangeEvent } from "react";
import { ACTIONS } from "./AdvisorsList";

type Props = {
  dispatch: ({ type, payload }: { type: string; payload: any }) => void;
};

const SortByReviews = ({ dispatch }: Props) => {
  return (
    <select
      name="sort-options"
      id="sort-options"
      onChange={(event) =>
        dispatch({ type: ACTIONS.SORT_BY_REVIEWS, payload: { event } })
      }
      className="h-6 px-4 rounded-md outline-none bg-gray-100 text-gray-600"
      defaultValue={"Sort by Reviews"}
    >
      <option disabled>Sort by Reviews</option>
      <option value="ascending">Lowest to Highest</option>
      <option value="descending">Highest to Lowest</option>
    </select>
  );
};

export default SortByReviews;
