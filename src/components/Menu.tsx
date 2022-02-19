type Props = {
  children: JSX.Element;
  menuIsVisible: boolean;
};

const Menu = ({ children, menuIsVisible }: Props) => {
  return (
    <div
      className={`${
        menuIsVisible ? "" : "hidden"
      } absolute right-0 w-1/2 h-full md:block bg-gray-500`}
    >
      {children}
    </div>
  );
};

export default Menu;
