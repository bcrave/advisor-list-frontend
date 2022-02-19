import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  handleRadioChange: (e: FormEvent) => void;
};

const AdvisorSort = ({ handleRadioChange }: Props) => {
  return (
    <form>
      <fieldset onChange={handleRadioChange}>
        <label>
          <input
            type="radio"
            id="show-all"
            name="filter-status"
            defaultChecked
          />
          All
        </label>
        <label>
          <input type="radio" id="hide-offline" name="filter-status" />
          Online
        </label>
        <label>
          <input type="radio" id="hide-online" name="filter-status" />
          Offline
        </label>
      </fieldset>
    </form>
  );
};

export default AdvisorSort;
