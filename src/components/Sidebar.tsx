import { useState } from 'react';
import Button from './Button';

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems: { name: string; section: string }[] = [
    { name: 'Books', section: 'books' },
    { name: 'Add Book', section: 'add-book' },
  ];

  return (
    <>
      <button
        className="md:hidden p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar menu" : "Open sidebar menu"}
        title={isOpen ? "Close sidebar menu" : "Open sidebar menu"}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <h2 className="text-2xl font-bold text-center">Library Dashboard</h2>
        <nav>
          {menuItems.map((item) => (
            <Button
              key={item.section}
              className="w-full text-left py-2 px-4 hover:bg-gray-700"
              onClick={() => {
                setActiveSection(item.section);
                setIsOpen(false);
              }}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;