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
    <div
      data-testid={`advisor-item-${index}`}
      className="px-2 py-6 bg-white rounded-2xl shadow-xl flex items-center"
    >
      <div className="flex flex-col justify-center items-center h-full">
        <img
          src={imageUrl}
          alt="profile"
          className="w-5/6 rounded-full mb-2 mr-4"
        />
        <p className="relative right-3 text-xs font-semibold">
          {isOnline ? "🟢 Online" : "🔴 Offline"}
        </p>
      </div>
      <div className="ml-2">
        <div className="mb-4">
          <h3 className="font-bold text-left text-lg">
            {firstName} {lastName}
          </h3>
          <p className="text-left font-semibold text-sm text-gray-500">
            {numOfReviews} reviews
          </p>
        </div>
        <div className="text-left">
          <h4 className="font-semibold mb-1">{firstName} Speaks:</h4>
          {languagesKnown.map((language) => (
            <p className="text-left text-sm text-gray-500 bg-blue-200 inline-block mr-2 mb-1 py-0.5 px-2 rounded-lg">
              {language}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvisorItem;
