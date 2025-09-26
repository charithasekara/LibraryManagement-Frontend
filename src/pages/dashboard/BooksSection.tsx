import React from 'react';
import Button from '../../components/Button';
import type { Book } from '../../types/Book';

interface BooksSectionProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
}

const BooksSection: React.FC<BooksSectionProps> = ({ books, onEditBook, onDeleteBook }) => {
  return (
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
            <tr key={book.id} className="hover:bg-gray-50 transition text-sm">
              <td className="border p-3">{book.name}</td>
              <td className="border p-3">{book.author}</td>
              <td className="border p-3">{book.description}</td>
              <td className="border p-3">
                <div className="flex justify-center items-center">
                  <Button
                    className="bg-yellow-500 text-white hover:bg-yellow-600 mr-2"
                    onClick={() => onEditBook(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() => onDeleteBook(book.id)}
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
  );
};

export default BooksSection;