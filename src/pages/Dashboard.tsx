import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";

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
      // Update existing book
      setBooks(
        books.map((book) =>
          book.id === editBookId ? { ...newBook, id: editBookId } : book
        )
      );
      setEditBookId(null);
    } else {
      // Add new book
      setBooks([...books, { ...newBook, id: Date.now() }]);
    }

    // Reset form
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
    <div className="flex min-h-screen">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-4 md:ml-64">
        {activeSection === "books" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Book List</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Author</th>
                  <th className="border p-2">Year</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td className="border p-2">{book.title}</td>
                    <td className="border p-2">{book.author}</td>
                    <td className="border p-2">{book.year}</td>
                    <td className="border p-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeSection === "add-book" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
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
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
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
