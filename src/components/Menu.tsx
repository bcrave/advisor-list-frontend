type Props = {
  children: JSX.Element | JSX.Element[];
  menuIsVisible: boolean;
};

const Menu = ({ children, menuIsVisible }: Props) => {
  return (
    <div
      className={`${
        menuIsVisible ? "" : "hidden"
      } md:block bg-gray-300 mb-6 p-4`}
    >
      <div className="md:w-1/2 m-auto">{children}</div>
    </div>
  );
};

export default Menu;
