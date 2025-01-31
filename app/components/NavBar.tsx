import React, { useState } from "react";
import Link from "next/link";
import UserCircle from "./UserCircle";
import X from "./X";
import Menu from "./Menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#F5F5DC] p-4 shadow-lg border-b border-[#D3C6A6]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-[#4A4A2F] font-bold text-xl hover:cursor-pointer transition-all hover:scale-105"
          onClick={() => router.push("/dashboard")}
        >
          News Knowledge
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-[#4A4A2F] hover:text-[#5C4033] transition-colors">
            Home
          </Link>
          <Link href="/news" className="text-[#4A4A2F] hover:text-[#5C4033] transition-colors">
            News
          </Link>
          <Link href="/profile" className="text-[#4A4A2F] hover:text-[#5C4033] transition-colors flex items-center">
            <UserCircle />
            Profile
          </Link>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#4A4A2F] hover:text-[#5C4033] focus:outline-none"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 p-4 bg-[#F5F5DC] rounded-lg shadow-md border border-[#C3B091]">
          <div className="flex flex-col space-y-4">
            <Link href="/dashboard" className="text-[#4A4A2F] hover:text-[#5C4033] transition-colors">
              Home
            </Link>
            <Link href="/news" className="text-[#4A4A2F] hover:text-[#5C4033] transition-colors">
              News
            </Link>
            <Link href="/profile" className="text-[#4A4A2F] hover:text-[#5C4033] transition-colors flex items-center">
              <UserCircle />
              Profile
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md w-full"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
