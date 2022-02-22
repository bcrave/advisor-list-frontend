import { ChangeEvent } from "react";

type Props = {
  handleSortOptionChange: (e: ChangeEvent) => void;
};

const SortByReviews = ({ handleSortOptionChange }: Props) => {
  return (
    <select
      name="sort-options"
      id="sort-options"
      onChange={handleSortOptionChange}
      className="h-6 px-4 rounded-md outline-none bg-gray-100 text-gray-600"
    >
      <option disabled selected>
        Sort by Reviews
      </option>
      <option value="ascending">Lowest to Highest</option>
      <option value="descending">Highest to Lowest</option>
    </select>
  );
};

export default SortByReviews;
