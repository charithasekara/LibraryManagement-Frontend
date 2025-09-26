import React from 'react';
import { Bell, User, PlusCircle } from 'lucide-react';
import Button from './Button';

interface HeaderProps {
  title: string;
  onAddClick?: () => void;
  showAddButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onAddClick, showAddButton = false }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-blue-600">{title}</h1>
        {showAddButton && (
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
            onClick={onAddClick}
          >
            <PlusCircle className="w-5 h-5" />
            Add Book
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100"
          title="Notifications"
        >
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button 
          className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
          title="User Profile"
        >
          <User className="w-6 h-6 text-gray-600" />
          <span className="hidden md:inline">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;