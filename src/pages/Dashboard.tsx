import { useState, useEffect } from "react";
import {
  BookOpen,
  PlusCircle,
  Bell,
  User,
  BarChart3,
  Activity,
} from "lucide-react";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";

interface Book {
  id: string;
  name: string;
  author: string;
  description: string;
}

const menuItems = [
  { name: "Books", section: "books", icon: <BookOpen className="w-5 h-5" /> },
  {
    name: "Add Book",
    section: "add-book",
    icon: <PlusCircle className="w-5 h-5" />,
  },
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
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setNewBook({ id: "", name: "", author: "", description: "" });
      setEditBookId(null);
      setActiveSection("books");
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book.");
    }
  };

  // Edit
  const handleEditBook = (book: Book) => {
    setNewBook(book);
    setEditBookId(book.id);
    setActiveSection("add-book");
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

  if (loading) return <div className="p-6">Loading books...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
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

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-blue-600">
            {menuItems.find((i) => i.section === activeSection)?.name}
          </h1>
          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100"
              title="Notifications"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
              <User className="w-6 h-6 text-gray-600" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          {/* Books Section */}
          {activeSection === "books" && (
            <div className="bg-white shadow rounded-xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Title</th>
                    <th className="border p-3 text-left">Author</th>
                    <th className="border p-3 text-left">Description</th>
                    <th className="border p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-gray-50 transition text-sm"
                    >
                      <td className="border p-3">{book.name}</td>
                      <td className="border p-3">{book.author}</td>
                      <td className="border p-3">{book.description}</td>
                      <td className="border p-3 justify-center items-center">
                        <div className="flex ">
<Button
                          className="bg-yellow-500 text-white hover:bg-yellow-600 mr-2"
                          onClick={() => handleEditBook(book)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          Delete
                        </Button>
                        </div>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Book */}
          {activeSection === "add-book" && (
            <div className="bg-white shadow rounded-xl p-6 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                {editBookId ? "Edit Book" : "Add New Book"}
              </h2>
              <form onSubmit={handleAddBook} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newBook.name}
                  onChange={(e) =>
                    setNewBook({ ...newBook, name: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={newBook.description}
                  onChange={(e) =>
                    setNewBook({ ...newBook, description: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  {editBookId ? "Update Book" : "Add Book"}
                </Button>
              </form>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === "analytics" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(dummyAnalytics).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white shadow rounded-xl p-6 text-center"
                >
                  <p className="text-3xl font-bold text-blue-600">{value}</p>
                  <p className="text-gray-600 capitalize">{key}</p>
                </div>
              ))}
            </div>
          )}

          {/* Activity Section */}
          {activeSection === "activity" && (
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <ul className="space-y-3">
                {dummyActivity.map((act) => (
                  <li
                    key={act.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>{act.message}</span>
                    <span className="text-gray-500 text-sm">{act.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="bg-white shadow rounded-xl p-6 max-w-md mx-auto text-center">
              <User className="w-20 h-20 mx-auto text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold">Admin User</h2>
              <p className="text-gray-600">admin@library.com</p>
              <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
                Edit Profile
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
