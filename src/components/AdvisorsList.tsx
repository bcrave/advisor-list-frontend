import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  let data = advisorsData.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));

  useEffect(() => {
    setAdvisors(data);
    setIsLoading(false);
  }, []);

  const handleRadioChange = (e: FormEvent) => {
    const { id } = e.target as HTMLElement;
    if (id === "hide-offline") {
      const advisorsOnline = data.filter((advisor) => advisor.isOnline);
      setAdvisors(advisorsOnline);
    } else if (id === "hide-online") {
      const advisorsOffline = data.filter((advisor) => !advisor.isOnline);
      setAdvisors(advisorsOffline);
    } else {
      setAdvisors(data);
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
          <OnlineOfflineFilter handleRadioChange={handleRadioChange} />
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
