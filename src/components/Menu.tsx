type Props = {
  children: JSX.Element;
  menuIsVisible: boolean;
};

const Menu = ({ children, menuIsVisible }: Props) => {
  return (
    <div
      className={`${
        menuIsVisible ? "" : "hidden"
      } right-0 w-full md:block bg-gray-300
        mb-6
      `}
    >
      {children}
    </div>
  );
};

export default Menu;
