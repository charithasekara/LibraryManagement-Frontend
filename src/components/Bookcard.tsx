import React from 'react';
import Button from './Button';

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
}

interface BookCardProps {
  book: Book;
  onClick?: () => void; // optional, e.g., open modal
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1">Author: {book.author}</p>
        <p className="text-gray-500">Year: {book.year}</p>
      </div>
      {onClick && (
        <Button
          className="mt-4 bg-blue-600 text-white hover:bg-blue-700 w-full"
          onClick={onClick}
        >
          View Details
        </Button>
      )}
    </div>
  );
};

export default BookCard;
