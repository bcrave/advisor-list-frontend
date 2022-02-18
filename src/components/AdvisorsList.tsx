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
    <section>
      <h1 className="text-3xl font-bold">Advisors</h1>
      <div className="flex flex-col justify-center items-center">
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
