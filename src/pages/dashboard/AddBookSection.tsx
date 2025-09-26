import React from 'react';
import Button from '../../components/Button';
import type { Book } from '../../types/Book';

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
  return (
    <div className="bg-white shadow rounded-xl p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={book.name}
          onChange={(e) => onChange({ ...book, name: e.target.value })}
          required
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => onChange({ ...book, author: e.target.value })}
          required
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={book.description}
          onChange={(e) => onChange({ ...book, description: e.target.value })}
          required
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          {isEditing ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </div>
  );
};

export default AddBookSection;