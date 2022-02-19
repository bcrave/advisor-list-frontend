import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { advisorsData } from "../__data__/advisorsData";
import AdvisorItem from "./AdvisorItem";
import AdvisorSort from "./AdvisorSort";

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
      <h1 className="text-3xl font-bold mb-6">Advisors</h1>
      <AdvisorSort handleRadioChange={handleRadioChange} />
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
    </section>
  );
};

export default AdvisorsList;
