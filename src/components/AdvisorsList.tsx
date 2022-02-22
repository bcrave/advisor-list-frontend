import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { advisorsData } from "../__data__/advisorsData";

import AdvisorItem from "./AdvisorItem";
import FilterByLanguage from "./FilterByLanguage";
import FilterByStatus from "./FilterByStatus";
import Header from "./Header";
import Menu from "./Menu";
import SortByReviews from "./SortByReviews";
import SkeletonProfile from "../skeletons/SkeletonProfile";

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

const AdvisorsList = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [advisorsByOnlineStatus, setAdvisorsByOnlineStatus] = useState<
    Advisor[]
  >([]);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [reviewsAreAscending, setReviewsAreAscending] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  let data = advisorsData.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));

  useEffect(() => {
    const fetchAdvisors = async () => {
      const { data } = await axios.get("http://localhost:5000/");
      setAdvisors(data);
      setIsLoading(false);
    };

    fetchAdvisors();
  }, []);

  const handleLanguageChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    const arrayToFilter =
      advisorsByOnlineStatus.length !== 0 ? advisorsByOnlineStatus : data;
    const filteredByOnlineStatus = filterByLanguage(arrayToFilter, value);
    const sorted = sortByReviewsOrder(filteredByOnlineStatus);
    setLanguageSearchTerm(value);
    setAdvisors(sorted);
  };

  const handleOnlineStatusChange = (e: FormEvent) => {
    const { id } = e.target as HTMLInputElement;
    let filteredByStatus: Advisor[];
    if (id === "hide-offline") {
      filteredByStatus = data.filter((advisor) => advisor.isOnline);
    } else if (id === "hide-online") {
      filteredByStatus = data.filter((advisor) => !advisor.isOnline);
    } else {
      filteredByStatus = data;
    }
    const filteredByLanguage = filterByLanguage(
      filteredByStatus,
      languageSearchTerm
    );
    const sorted = sortByReviewsOrder(filteredByLanguage);
    setAdvisorsByOnlineStatus(filteredByStatus);
    setAdvisors(sorted);
  };

  const handleSortOptionChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    const advisorsCopy = advisors.map((advisor) => advisor);

    if (value === "ascending") {
      advisorsCopy.sort((a, b) => (a.numOfReviews > b.numOfReviews ? 1 : -1));
      setReviewsAreAscending(true);
      setAdvisors(advisorsCopy);
    } else if (value === "descending") {
      advisorsCopy.sort((a, b) => (a.numOfReviews < b.numOfReviews ? 1 : -1));
      setReviewsAreAscending(false);
      setAdvisors(advisorsCopy);
    }
  };

  const filterByLanguage = (array: Advisor[], languageSearchTerm: string) => {
    return array.filter((advisor) => {
      return advisor.languagesKnown.some((language) =>
        language.toLowerCase().includes(languageSearchTerm.toLowerCase())
      );
    });
  };

  const sortByReviewsOrder = (array: Advisor[]) => {
    if (reviewsAreAscending) {
      return array.sort((a, b) => (a.numOfReviews > b.numOfReviews ? 1 : -1));
    } else {
      return array.sort((a, b) => (a.numOfReviews < b.numOfReviews ? 1 : -1));
    }
  };

  return (
    <section className="text-center">
      <Header
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
      <div className="flex flex-col">
        <Menu menuIsVisible={menuIsVisible}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <FilterByStatus
              handleOnlineStatusChange={handleOnlineStatusChange}
            />
            <SortByReviews handleSortOptionChange={handleSortOptionChange} />
          </div>
          <FilterByLanguage handleLanguageChange={handleLanguageChange} />
        </Menu>
        <div>
          {isLoading &&
            [1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonProfile key={n} theme="light" />
            ))}
          {advisors && (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12 m-auto">
              {advisors.map((advisor, index) => {
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
          {advisors.length === 0 && languageSearchTerm !== "" && (
            <p>
              We don't seem to have anyone who knows {languageSearchTerm} :(
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdvisorsList;
