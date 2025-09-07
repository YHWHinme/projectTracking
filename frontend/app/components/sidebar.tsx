function Sidebar() {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-31 m-0 
			flex flex-col text-center
			shadow-2xl
			bg-white
			"
    >
      <NavButton name={"Item"} />
      <NavButton name={"Something"} />
    </div>
  );
}

function NavButton({ name }: { name: string }) {
  return (
    <div
      className="rounded-3xl shadow-xl
			flex justify-center
			bg-white text-black
			hover:bg-gray-500 cursor-pointer
			p-1 mx-2 my-2
			transition-all ease-linear duration-300
			"
    >
      {name}
    </div>
  );
}

export default Sidebar;
