import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { advisorsData } from "../__data__/advisorsData";

import AdvisorItem from "./AdvisorItem";
import FilterByLanguage from "./FilterByLanguage";
import FilterByStatus from "./FilterByStatus";
import Header from "./Header";
import Menu from "./Menu";

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
  const [isLoading, setIsLoading] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  let data = advisorsData.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));

  useEffect(() => {
    setAdvisors(data);
    setIsLoading(false);
  }, []);

  const handleLanguageChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    const arrayToFilter =
      advisorsByOnlineStatus.length !== 0 ? advisorsByOnlineStatus : data;
    const filteredByOnlineStatus = filterByLanguage(arrayToFilter, value);
    setLanguageSearchTerm(value);
    setAdvisors(filteredByOnlineStatus);
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
    setAdvisorsByOnlineStatus(filteredByStatus);
    setAdvisors(filteredByLanguage);
  };

  const filterByLanguage = (array: Advisor[], languageSearchTerm: string) => {
    return array.filter((advisor) => {
      return advisor.languagesKnown.some((language) =>
        language.toLowerCase().includes(languageSearchTerm.toLowerCase())
      );
    });
  };

  return (
    <section className="text-center">
      <Header
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
      <div className="flex flex-col">
        <Menu menuIsVisible={menuIsVisible}>
          <FilterByStatus handleOnlineStatusChange={handleOnlineStatusChange} />
          <FilterByLanguage handleLanguageChange={handleLanguageChange} />
        </Menu>
        <div>
          {isLoading && <h2>Loading...</h2>}
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
        </div>
      </div>
    </section>
  );
};

export default AdvisorsList;
