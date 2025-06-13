export const Root = ({ children, isOpen }) => {

  return (
    <div className={`fixed z-20 top-0 left-0 h-full bg-gray-50 p-2 border-r border-black/20 shadow-lg
      transition-transform transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      sm:relative sm:translate-x-0 sm:min-h-screen sm:w-[300px] w-[250px]`}
    >
      {children}
    </div>
  );
};
