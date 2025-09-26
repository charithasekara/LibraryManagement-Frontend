import { useState } from "react";
import {
  BookOpen,
  PlusCircle,
  Bell,
  User,
  BarChart3,
  Activity,
} from "lucide-react";
import Button from "./Button";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { name: "Books", section: "books", icon: <BookOpen className="w-5 h-5" /> },
  // { name: "Add Book", section: "add-book", icon: <PlusCircle className="w-5 h-5" /> },
  { name: "Analytics", section: "analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { name: "Activity", section: "activity", icon: <Activity className="w-5 h-5" /> },
  { name: "Profile", section: "profile", icon: <User className="w-5 h-5" /> },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-6 border-b">
        {isSidebarOpen && (
          <h2 className="text-2xl font-bold text-blue-600">Library</h2>
        )}
        <button
          className="text-gray-600 hover:text-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "<" : ">"}
        </button>
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-2">
        {menuItems.map((item) => (
          <button
            key={item.section}
            className={`flex items-center gap-3 w-full p-3 rounded-lg font-semibold transition-all ${
              activeSection === item.section
                ? "bg-blue-50 text-blue-600 shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
            onClick={() => setActiveSection(item.section)}
          >
            {item.icon}
            {isSidebarOpen && <span>{item.name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
