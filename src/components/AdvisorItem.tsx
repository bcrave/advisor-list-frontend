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

type Props = {
  advisor: Advisor;
  index: number;
};

const AdvisorItem = ({
  advisor: {
    firstName,
    lastName,
    imageUrl,
    isOnline,
    numOfReviews,
    languagesKnown,
  },
  index,
}: Props) => {
  return (
    <div data-testid={`advisor-item-${index}`} className="flex w-8/12">
      <img src={imageUrl} alt="profile" />
      <div className="w-full flex justify-between">
        <div>
          <h3>
            {firstName} {lastName}
          </h3>
          <p>{isOnline ? "🟢 Online" : "🔴 Offline"}</p>
        </div>
        <div>
          <p>{numOfReviews} reviews</p>
          <p>
            {firstName} Speaks: {languagesKnown.map((language) => language)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvisorItem;
