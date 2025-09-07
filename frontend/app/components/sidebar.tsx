import Link from "next/link";
function Sidebar() {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-31 m-0 
			flex flex-col text-center
			shadow-2xl
			bg-white
			"
    >
      <NavButton name={"Home"} link={"/"} />
    </div>
  );
}

function NavButton({ name, link }: { name: string; link: string }) {
  return (
    <Link href={link}>
      <div
        className="rounded-3xl shadow-xl
			flex justify-center
			bg-white text-black
			hover:bg-gray-500 group:cursor-pointer
			p-1 mx-2 my-2
			transition-all ease-linear duration-300
			"
      >
        {name}
      </div>
    </Link>
  );
}

export default Sidebar;
