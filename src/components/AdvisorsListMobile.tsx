import { useEffect, useState } from "react";
import { advisorsData } from "../__data__/advisorsData";
import AdvisorItem from "./AdvisorItem";

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
  const [advisors, setAdvisors] = useState<Advisor[]>(advisorsData);

  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold mb-6">Advisors</h1>
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
    </section>
  );
};

export default AdvisorsList;
