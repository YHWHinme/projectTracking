"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className="fixed top-0 left-0 h-screen w-31 m-0 
			flex flex-col text-center
			shadow-2xl
			bg-white
			"
    >
      <NavButton name={"Home"} link={"/"} isActive={pathname === "/"} />
    </div>
  );
}

function NavButton({
  name,
  link,
  isActive,
}: {
  name: string;
  link: string;
  isActive: boolean;
}) {
  return (
    <Link href={link}>
      <div
        className={`rounded-3xl shadow-xl
			flex justify-center
			text-black
			hover:bg-gray-500 cursor-pointer
			p-1 mx-2 my-2
			transition-all ease-linear duration-300
			${isActive ? "bg-gray-300" : "bg-white"}
			`}
      >
        {name}
      </div>
    </Link>
  );
}

export default Sidebar;
