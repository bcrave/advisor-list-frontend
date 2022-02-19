type Props = {
  setMenuIsVisible: (menuIsVisible: boolean) => void;
  menuIsVisible: boolean;
};

const Header = ({ setMenuIsVisible, menuIsVisible }: Props) => {
  return (
    <div className="flex justify-between items-center px-4 pb-6">
      <h1 className="text-2xl md:text-3xl font-bold">Advisors</h1>
      <div
        className="cursor-pointer md:hidden"
        onClick={() => setMenuIsVisible(!menuIsVisible)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;
