import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import { BookOpen, UserPlus, Calendar } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("books");
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    year: "",
  });
  const [editBookId, setEditBookId] = useState<number | null>(null);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.year) return;

    if (editBookId !== null) {
      setBooks(
        books.map((book) =>
          book.id === editBookId ? { ...newBook, id: editBookId } : book
        )
      );
      setEditBookId(null);
    } else {
      setBooks([...books, { ...newBook, id: Date.now() }]);
    }

    setNewBook({ id: 0, title: "", author: "", year: "" });
    setActiveSection("books");
  };

  const handleEditBook = (book: Book) => {
    setNewBook(book);
    setEditBookId(book.id);
    setActiveSection("add-book");
  };

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
<Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        {/* Stats Cards */}
        {activeSection === "books" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-center">
              <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
              <h3 className="text-2xl font-bold">{books.length}</h3>
              <p className="text-gray-500">Books</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-center">
              <UserPlus className="w-10 h-10 text-blue-600 mb-2" />
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-gray-500">Members</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-center">
              <Calendar className="w-10 h-10 text-blue-600 mb-2" />
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-gray-500">Events</p>
            </div>
          </div>
        )}

        {/* Books List */}
        {activeSection === "books" && (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Book List</h2>
            {books.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No books added yet.
              </p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border p-3 text-left text-gray-700">Title</th>
                    <th className="border p-3 text-left text-gray-700">Author</th>
                    <th className="border p-3 text-left text-gray-700">Year</th>
                    <th className="border p-3 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-blue-50 transition cursor-pointer"
                    >
                      <td className="border p-3">{book.title}</td>
                      <td className="border p-3">{book.author}</td>
                      <td className="border p-3">{book.year}</td>
                      <td className="border p-3 flex gap-2">
                        <Button
                          className="bg-yellow-500 text-white hover:bg-yellow-600"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Add/Edit Book */}
        {activeSection === "add-book" && (
          <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              {editBookId !== null ? "Edit Book" : "Add New Book"}
            </h2>
            <form onSubmit={handleAddBook} className="space-y-4">
              <Input
                label="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
              <Input
                label="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />
              <Input
                label="Year"
                type="number"
                value={newBook.year}
                onChange={(e) =>
                  setNewBook({ ...newBook, year: e.target.value })
                }
                required
              />
              <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">
                {editBookId !== null ? "Update Book" : "Add Book"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
