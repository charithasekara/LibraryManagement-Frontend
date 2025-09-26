import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";
import BooksSection from "./dashboard/BooksSection";
import AnalyticsSection from "./dashboard/AnalyticsSection";
import ActivitySection from "./dashboard/ActivitySection";
import ProfileSection from "./dashboard/ProfileSection";
import type { Book } from "../types/Book";
import { BookOpen, BarChart3, Activity, User } from "lucide-react";


export const menuItems = [
  { name: "Books", section: "books", icon: <BookOpen className="w-5 h-5" /> },
  {
    name: "Analytics",
    section: "analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    name: "Activity",
    section: "activity",
    icon: <Activity className="w-5 h-5" />,
  },
  { name: "Profile", section: "profile", icon: <User className="w-5 h-5" /> },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("books");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: "",
    name: "",
    author: "",
    description: "",
  });
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Dummy data for new sections
  const dummyAnalytics = {
    totalBooks: 120,
    activeUsers: 45,
    borrowedToday: 12,
    overdue: 5,
  };

  const dummyActivity = [
    { id: 1, message: "John borrowed 'React Basics'", time: "2h ago" },
    { id: 2, message: "Mary returned 'UI/UX Design Trends'", time: "5h ago" },
    { id: 3, message: "New book added: 'Advanced Node.js'", time: "1d ago" },
  ];

  // Fetch all books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://localhost:7036/api/Books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Add / Update
  const handleAddBook = async () => {
    try {
      let response: { data: Book };
      if (editBookId) {
        response = await axios.put<Book>(
          `https://localhost:7036/api/Books/${editBookId}`,
          newBook,
          { headers: { "Content-Type": "application/json" } }
        );
        setBooks(books.map((b) => (b.id === editBookId ? response.data : b)));
        toast.success("Book updated successfully");
      } else {
        response = await axios.post<Book>(
          "https://localhost:7036/api/Books",
          newBook,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setBooks([...books, response.data]);
        toast.success("Book added successfully");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book.");
    }
  };

  // Delete
  const handleDeleteBook = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `https://localhost:7036/api/Books/${id}`
      );
      if (response.status === 200) {
        setBooks(books.filter((b) => b.id !== id));
        toast.success("Book deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book.");
    }
  };

  const handleCloseModal = () => {
    setIsBookModalOpen(false);
    setNewBook({ id: "", name: "", author: "", description: "" });
    setEditBookId(null);
  };

  const handleOpenModal = () => {
    setIsBookModalOpen(true);
  };

  if (loading) return <div className="p-6">Loading books...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col m-8 border border-gray-200 rounded-4xl bg-white p-4">
        <Header 
          title={menuItems.find((i) => i.section === activeSection)?.name || ''} 
          showAddButton={activeSection === "books"}
          onAddClick={handleOpenModal}
        />

        {/* Main */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          {activeSection === "books" && (
            <BooksSection
              books={books}
              onEditBook={(book) => {
                setNewBook(book);
                setEditBookId(book.id);
                setIsBookModalOpen(true);
              }}
              onDeleteBook={handleDeleteBook}
            />
          )}

          {activeSection === "analytics" && (
            <AnalyticsSection analytics={dummyAnalytics} />
          )}

          {activeSection === "activity" && (
            <ActivitySection activities={dummyActivity} />
          )}

          {activeSection === "profile" && <ProfileSection />}
        </main>

        {/* Book Modal */}
        <Modal
          isOpen={isBookModalOpen}
          onClose={handleCloseModal}
          title={editBookId ? "Edit Book" : "Add New Book"}
          onSubmit={handleAddBook}
          submitText={editBookId ? "Update Book" : "Add Book"}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
