import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Button from '../components/Button';
import BookCard from '../components/Bookcard'; // optional, reusable book card component
import { useState } from 'react';

interface HomePageProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const featuredBooks = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', year: '2018' },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', year: '2008' },
  { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', year: '1999' },
];

const HomePage: React.FC<HomePageProps> = ({ setIsModalOpen }) => {
  const [modalBookId, setModalBookId] = useState<number | null>(null);

  return (
    <div>
      <Navbar setIsModalOpen={setIsModalOpen} />

      {/* Hero Section */}
      <section className="relative  text-white py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Explore Our Digital Library
          </h1>
          <p className="text-xl mb-8 drop-shadow">
            Thousands of books at your fingertips. Learn, explore, and grow!
          </p>
          <Button
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Browse Books
          </Button>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => setModalBookId(book.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 container mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src="/library-modern.jpg"
            alt="Library"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="mb-4 text-gray-700">
            We are a modern library dedicated to providing access to a vast range of
            books and resources. Join thousands of members in exploring knowledge.
          </p>
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">5000+</h3>
              <p className="text-gray-600">Books</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">1000+</h3>
              <p className="text-gray-600">Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-50 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4 text-gray-700">
          Email: library@example.com | Phone: (123) 456-7890
        </p>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Get in Touch
        </Button>
      </section>

      {/* Modal */}
      <Modal
        isOpen={modalBookId !== null}
        setIsOpen={() => setModalBookId(null)}
      >
        <div className="p-4">
          <h3 className="text-2xl font-bold mb-4">
            {featuredBooks.find((b) => b.id === modalBookId)?.title}
          </h3>
          <p className="mb-2">
            Author: {featuredBooks.find((b) => b.id === modalBookId)?.author}
          </p>
          <p>Year: {featuredBooks.find((b) => b.id === modalBookId)?.year}</p>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
