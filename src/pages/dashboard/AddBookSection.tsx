import React, { useState } from 'react';
import Button from '../../components/Button';
import type { Book } from '../../types/Book';
import { BookOpen, User, FileText } from 'lucide-react';

interface AddBookSectionProps {
  book: Book;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (book: Book) => void;
}

const AddBookSection: React.FC<AddBookSectionProps> = ({
  book,
  isEditing,
  onSubmit,
  onChange,
}) => {
  const [focused, setFocused] = useState<string>('');

  return (
    <div className="bg-white  rounded-xl p-6 sm:p-8 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {isEditing ? "Edit Book Details" : "Add New Book"}
        </h2>
        <p className="text-gray-600 mt-2">
          {isEditing 
            ? "Update the book information below"
            : "Fill in the book details to add it to your library"
          }
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Book Title
          </label>
          <div className={`relative transition-all duration-300 ${
            focused === 'title' ? 'shadow-md' : ''
          }`}>
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="title"
              type="text"
              placeholder="Enter the book title"
              value={book.name}
              onChange={(e) => onChange({ ...book, name: e.target.value })}
              onFocus={() => setFocused('title')}
              onBlur={() => setFocused('')}
              required
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author Name
          </label>
          <div className={`relative transition-all duration-300 ${
            focused === 'author' ? 'shadow-md' : ''
          }`}>
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="author"
              type="text"
              placeholder="Enter the author's name"
              value={book.author}
              onChange={(e) => onChange({ ...book, author: e.target.value })}
              onFocus={() => setFocused('author')}
              onBlur={() => setFocused('')}
              required
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Book Description
          </label>
          <div className={`relative transition-all duration-300 ${
            focused === 'description' ? 'shadow-md' : ''
          }`}>
            <FileText className="absolute left-3 top-4 text-gray-400 h-5 w-5" />
            <textarea
              id="description"
              placeholder="Enter a brief description of the book"
              value={book.description}
              onChange={(e) => onChange({ ...book, description: e.target.value })}
              onFocus={() => setFocused('description')}
              onBlur={() => setFocused('')}
              required
              rows={4}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
            />
          </div>
        </div>

        <Button 
          className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base font-medium shadow-sm hover:shadow-md transition-all duration-300 mt-6"
        >
          {isEditing ? "Update Book Details" : "Add Book to Library"}
        </Button>
      </form>
    </div>
  );
};

export default AddBookSection;