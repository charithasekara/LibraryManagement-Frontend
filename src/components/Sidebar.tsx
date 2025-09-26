import { useState } from "react";
import {
  BookOpen,
  User,
  BarChart3,
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 flex flex-col h-screen ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
        {isSidebarOpen && (
          <h2 className="text-2xl font-bold text-blue-600">Library</h2>
        )}
        <button
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-6 flex flex-col gap-2 px-2">
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

      <div className="border-t p-4 border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg font-semibold transition-all text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
