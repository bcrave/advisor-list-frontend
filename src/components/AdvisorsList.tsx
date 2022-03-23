import axios from "axios";
import { useEffect, useReducer, useState } from "react";

import AdvisorItem from "./AdvisorItem";
import FilterByLanguage from "./FilterByLanguage";
import FilterByStatus from "./FilterByStatus";
import Header from "./Header";
import Menu from "./Menu";
import SortByReviews from "./SortByReviews";
import SkeletonProfile from "../skeletons/SkeletonProfile";

export const ACTIONS = {
  SET_INITIAL_DATA: "set-initial-data",
  SORT_BY_REVIEWS: "sort-by-reviews",
  FILTER_BY_ONLINE_STATUS: "filter-by-online-status",
  FILTER_BY_LANGUAGE: "filter-by-language",
};

const initialState: AdvisorState = {
  data: [],
  advisors: [],
  advisorsByOnlineStatus: [],
  reviewsAreAscending: null,
  languageSearchTerm: "",
};

type AdvisorState = {
  data: Advisor[];
  advisors: Advisor[];
  advisorsByOnlineStatus: Advisor[];
  reviewsAreAscending: Boolean | null;
  languageSearchTerm: string;
};

type Advisor = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  isOnline: boolean;
  languagesKnown: string[];
  numOfReviews: number;
  imageUrl: string;
};

const reducer = (
  state: AdvisorState,
  { type, payload }: { type: string; payload: any }
): AdvisorState => {
  switch (type) {
    case ACTIONS.SET_INITIAL_DATA:
      return {
        ...state,
        data: payload.data,
        languageSearchTerm: "",
        advisors: payload.data,
      };
    case ACTIONS.SORT_BY_REVIEWS:
      if (payload.event.target.value === "ascending") {
        state.reviewsAreAscending = true;
        return {
          ...state,
          advisors: sortByReviewsOrder(
            state.advisors,
            state.reviewsAreAscending
          ),
        };
      } else if (payload.event.target.value === "descending") {
        state.reviewsAreAscending = false;
        return {
          ...state,
          advisors: sortByReviewsOrder(
            state.advisors,
            state.reviewsAreAscending
          ),
        };
      } else return state;

    case ACTIONS.FILTER_BY_ONLINE_STATUS:
      let filteredByStatus: Advisor[];
      if (payload.event.target.id === "hide-offline") {
        filteredByStatus = state.data.filter((advisor) => advisor.isOnline);
      } else if (payload.event.target.id === "hide-online") {
        filteredByStatus = state.data.filter((advisor) => !advisor.isOnline);
      } else {
        filteredByStatus = state.data;
      }
      let onlineStatusFilteredByLanguage = filterByLanguage(
        filteredByStatus,
        state.languageSearchTerm
      );
      let onlineStatusSorted = sortByReviewsOrder(
        onlineStatusFilteredByLanguage,
        state.reviewsAreAscending
      );
      return {
        ...state,
        advisorsByOnlineStatus: onlineStatusFilteredByLanguage,
        advisors: onlineStatusSorted,
      };

    case ACTIONS.FILTER_BY_LANGUAGE:
      const arrayToFilter =
        state.advisorsByOnlineStatus.length !== 0
          ? state.advisorsByOnlineStatus.map((advisor) => advisor)
          : state.data.map((advisor) => advisor);
      const filteredByLanguage = filterByLanguage(
        arrayToFilter,
        payload.event.target.value
      );
      const sorted = sortByReviewsOrder(
        filteredByLanguage,
        state.reviewsAreAscending
      );
      return {
        ...state,
        languageSearchTerm: payload.event.target.value,
        advisors: sorted,
      };
    default:
      return state;
  }
};

const filterByLanguage = (array: Advisor[], languageSearchTerm: string) => {
  languageSearchTerm = languageSearchTerm || "";

  return array.filter((advisor) => {
    return advisor.languagesKnown.some((language) =>
      language.toLowerCase().includes(languageSearchTerm.toLowerCase())
    );
  });
};

const sortByReviewsOrder = (
  array: Advisor[],
  reviewsAreAscending: Boolean | null
) => {
  if (reviewsAreAscending === null) return array;
  if (reviewsAreAscending)
    return array.sort((a, b) => (a.numOfReviews > b.numOfReviews ? 1 : -1));

  return array.sort((a, b) => (a.numOfReviews < b.numOfReviews ? 1 : -1));
};

const AdvisorsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchAdvisors = async () => {
      const { data } = await axios.get("http://localhost:5000/");
      data.sort((a: Advisor, b: Advisor) => (a.lastName > b.lastName ? 1 : -1));

      dispatch({ type: ACTIONS.SET_INITIAL_DATA, payload: { data } });
      setIsLoading(false);
    };
    fetchAdvisors();
  }, []);

  return (
    <section className="text-center">
      <Header
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
      <div className="flex flex-col">
        <Menu menuIsVisible={menuIsVisible}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <FilterByStatus dispatch={dispatch} />
            <SortByReviews dispatch={dispatch} />
          </div>
          <FilterByLanguage dispatch={dispatch} />
        </Menu>
        <div>
          {isLoading &&
            [1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonProfile key={n} theme="light" />
            ))}
          {state.advisors && (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12 m-auto">
              {state.advisors.map((advisor: Advisor, index: number) => {
                return (
                  <AdvisorItem
                    key={advisor.id}
                    index={index}
                    advisor={advisor}
                    data-testid={`advisor-item-${index}`}
                  />
                );
              })}
            </div>
          )}
          {state.advisors.length === 0 && state.languageSearchTerm !== "" && (
            <p>
              We don't seem to have anyone who knows {state.languageSearchTerm}{" "}
              :(
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdvisorsList;
