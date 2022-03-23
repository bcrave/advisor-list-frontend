import type { Advisor, AdvisorState } from "../components/AdvisorsList";

export const ACTIONS = {
  SET_INITIAL_DATA: "set-initial-data",
  SORT_BY_REVIEWS: "sort-by-reviews",
  FILTER_BY_ONLINE_STATUS: "filter-by-online-status",
  FILTER_BY_LANGUAGE: "filter-by-language",
};

export const advisorsReducer = (
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
