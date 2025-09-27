import React, { useState } from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';
import Button from '../../components/Button';
import TableSkeleton from '../../components/TableSkeleton';
import type { Book } from '../../types/Book';

interface BooksSectionProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  isLoading?: boolean;
}

const BooksSection: React.FC<BooksSectionProps> = ({ 
  books, 
  onEditBook, 
  onDeleteBook,
  isLoading = false 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Dummy filter options
  const filterOptions = [
    { value: "all", label: "All Books" },
    { value: "available", label: "Available" },
    { value: "borrowed", label: "Borrowed" },
    { value: "new", label: "Newly Added" },
  ];

  // Dummy search function
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search books by title, author, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${filter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {book.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                    {book.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Button
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                        onClick={() => onEditBook(book)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                        onClick={() => onDeleteBook(book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found matching your search criteria.</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default BooksSection;