import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface NavbarProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="p-4 mx-2 md:mx-4 lg:mx-6 sticky top-0 z-50 bg-transparent">
        <div className="container mx-auto flex justify-between items-center">
          <div className="bg-white/70 px-7 py-2 rounded-xl backdrop-blur-md text-2xl font-bold text-gray-800 border-1">
            Library
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/70 px-10 py-3 rounded-xl backdrop-blur-md hidden md:flex space-x-6 items-center border-1">
              <Link
                to="/"
                className="text-gray-800 hover:underline hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-800 hover:underline hover:text-blue-600"
              >
                Dashboard
              </Link>
              <a
                href="#about"
                className="text-gray-800 hover:underline hover:text-blue-600"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-800 hover:underline hover:text-blue-600"
              >
                Contact
              </a>
            </div>

            <Button
              className=" bg-white/70 px-8 py-3 backdrop-blur-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md hidden md:inline-block"
              onClick={() => setIsModalOpen(true)}
            >
              Sign In
            </Button>
          </div>

          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 space-y-3 bg-white/90 border-t border-gray-200 p-4 rounded-b-lg">
            <Link
              to="/"
              className="block text-gray-800 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block text-gray-800 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <a
              href="#about"
              className="block text-gray-800 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-800 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Button
              className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
