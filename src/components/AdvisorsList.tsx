import { FormEvent, useEffect, useState } from "react";
import { advisorsData } from "../__data__/advisorsData";

import AdvisorItem from "./AdvisorItem";
import OnlineOfflineFilter from "./OnlineOfflineFilter";
import Menu from "./Menu";
import Header from "./Header";

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
  const [advisors, setAdvisors] = useState<Advisor[]>();
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  let data = advisorsData.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));

  useEffect(() => {
    setAdvisors(data);
    setIsLoading(false);
  }, []);

  const handleChange = (e: FormEvent) => {
    let filtered = filterByOnlineStatus(e);
    const filteredByLanguage = filterByLanguage(e, filtered);
    setAdvisors(filteredByLanguage);
  };

  const filterByLanguage = (e: FormEvent, array: Advisor[]) => {
    const { value } = e.target as HTMLInputElement;
    if (value === "") return array;
    const filteredAdvisors = array.filter((advisor) => {
      return advisor.languagesKnown.some((string) => string.includes(language));
    });
    return filteredAdvisors;
  };

  const filterByOnlineStatus = (e: FormEvent) => {
    const { id } = e.target as HTMLInputElement;
    if (id === "hide-offline") {
      const advisorsOnline = data.filter((advisor) => advisor.isOnline);
      return advisorsOnline;
    } else if (id === "hide-online") {
      const advisorsOffline = data.filter((advisor) => !advisor.isOnline);
      return advisorsOffline;
    }
    return data;
  };

  const handleLanguageChange = (e: FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    const filteredAdvisors = data.filter((advisor) =>
      advisor.languagesKnown.some((string) => string.includes(value))
    );
    setLanguage(value);
    return filteredAdvisors;
  };

  return (
    <section className="text-center">
      <Header
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
      <div className="flex flex-col">
        <Menu menuIsVisible={menuIsVisible}>
          <OnlineOfflineFilter
            handleChange={handleChange}
            handleRadioChange={filterByOnlineStatus}
            handleLanguageChange={handleLanguageChange}
          />
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
