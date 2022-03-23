import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { advisorsReducer, ACTIONS } from "../helpers/advisorsReducer";

import AdvisorItem from "./AdvisorItem";
import FilterByLanguage from "./FilterByLanguage";
import FilterByStatus from "./FilterByStatus";
import Header from "./Header";
import Menu from "./Menu";
import SortByReviews from "./SortByReviews";
import SkeletonProfile from "../skeletons/SkeletonProfile";

const initialState: AdvisorState = {
  data: [],
  advisors: [],
  advisorsByOnlineStatus: [],
  reviewsAreAscending: null,
  languageSearchTerm: "",
  onlineStatuses: {
    showAll: true,
    hideOnline: false,
    hideOffline: false,
  },
};

export type AdvisorState = {
  data: Advisor[];
  advisors: Advisor[];
  advisorsByOnlineStatus: Advisor[];
  reviewsAreAscending: Boolean | null;
  languageSearchTerm: string;
  onlineStatuses: {
    showAll: Boolean;
    hideOnline: Boolean;
    hideOffline: Boolean;
  };
};

export type Advisor = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  isOnline: boolean;
  languagesKnown: string[];
  numOfReviews: number;
  imageUrl: string;
};

const AdvisorsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const [state, dispatch] = useReducer(advisorsReducer, initialState);

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
