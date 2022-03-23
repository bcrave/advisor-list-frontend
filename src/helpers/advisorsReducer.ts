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
      let filteredByOnlineStatus: Advisor[];
      if (payload.event.target.id === "hide-offline") {
        state.onlineStatuses = {
          showAll: false,
          hideOnline: false,
          hideOffline: true,
        };
        filteredByOnlineStatus = filterByOnlineStatus(
          state.data.map((advisor) => advisor),
          state.onlineStatuses
        );
      } else if (payload.event.target.id === "hide-online") {
        state.onlineStatuses = {
          showAll: false,
          hideOnline: true,
          hideOffline: false,
        };
        filteredByOnlineStatus = filterByOnlineStatus(
          state.data.map((advisor) => advisor),
          state.onlineStatuses
        );
      } else {
        state.onlineStatuses = {
          showAll: true,
          hideOnline: false,
          hideOffline: false,
        };
        filteredByOnlineStatus = state.data;
      }
      const onlineStatusFilteredByLanguage = filterByLanguage(
        filteredByOnlineStatus,
        state.languageSearchTerm
      );
      const onlineStatusSorted = sortByReviewsOrder(
        onlineStatusFilteredByLanguage,
        state.reviewsAreAscending
      );
      return {
        ...state,
        advisorsByOnlineStatus: onlineStatusFilteredByLanguage,
        advisors: onlineStatusSorted,
      };

    case ACTIONS.FILTER_BY_LANGUAGE:
      const filteredByLanguage: Advisor[] = filterByLanguage(
        state.data.map((advisor) => advisor),
        payload.event.target.value
      );
      const filteredByLanguageAndStatus: Advisor[] = filterByOnlineStatus(
        filteredByLanguage,
        state.onlineStatuses
      );
      const sorted = sortByReviewsOrder(
        filteredByLanguageAndStatus,
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

const filterByOnlineStatus = (
  array: Advisor[],
  onlineStatuses: {
    showAll: Boolean;
    hideOnline: Boolean;
    hideOffline: Boolean;
  }
) => {
  if (onlineStatuses.showAll) return array;
  if (onlineStatuses.hideOnline)
    return array.filter((advisor) => !advisor.isOnline);
  return array.filter((advisor) => advisor.isOnline);
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
