import { useState } from "react";
import { BookOpen, PlusCircle } from "lucide-react";
import Button from "./Button";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { name: "Books", section: "books", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Add Book", section: "add-book", icon: <PlusCircle className="w-5 h-5" /> },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-40 bg-white rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold text-center text-blue-600 py-6 border-b">
            Library Dashboard
          </h2>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.section}
                className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-all ${
                  activeSection === item.section
                    ? "bg-blue-50 text-blue-600 shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => {
                  setActiveSection(item.section);
                  setIsOpen(false);
                }}
              >
                {item.icon}
                <span className="hidden md:inline">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="px-4 py-6 border-t">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
