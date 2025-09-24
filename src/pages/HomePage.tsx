import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Button from "../components/Button";
import {
  X,
  BookOpen,
  Headphones,
  Calendar,
  DoorOpen,
  UserPlus,
  ToyBrick,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
interface FeaturedBook {
  id: number;
  title: string;
  author: string;
  year: string;
  cover: string;
  description: string;
}

interface HomePageProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const featuredBooks: FeaturedBook[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    year: "2018",
    cover: "/src/assets/covers/atomic-habits.jpg",
    description:
      "An easy & proven way to build good habits and break bad ones.",
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: "2008",
    cover: "/src/assets/covers/clean-code.jpg",
    description:
      "A handbook of agile software craftsmanship for writing better code.",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    year: "1999",
    cover: "/src/assets/covers/pragmatic-programmer.jpg",
    description:
      "Classic book on pragmatic and practical approaches to coding and design.",
  },
];

const HomePage: React.FC<HomePageProps> = ({ setIsModalOpen }) => {
  const [modalBookId, setModalBookId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const modalBook = featuredBooks.find((b) => b.id === modalBookId);

  // Focus trapping for modal accessibility
  useEffect(() => {
    if (modalBookId !== null && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setModalBookId(null);
        }
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [modalBookId]);

  return (
    <div className="font-sans text-gray-800">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar setIsModalOpen={setIsModalOpen} />
      </div>

      {/* Hero Section */}
      <section className="relative text-white py-32 md:py-48 text-center bg-[url('/bg-library.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-blue-900/40" />
        <div className="relative container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl tracking-tight">
            Explore Our Digital Library
          </h1>
          <p className="text-lg md:text-xl mb-12 drop-shadow-md max-w-2xl mx-auto">
            Discover thousands of books at your fingertips. Learn, explore, and
            grow!
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12 flex rounded-full overflow-hidden shadow-xl bg-white/90 backdrop-blur-sm">
            <input
              type="text"
              placeholder="Search books by title or author..."
              className="w-full px-6 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 font-semibold rounded-full">
              Search
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              Browse Books
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer bento-card"
                onClick={() => setModalBookId(book.id)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500">{book.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">
            Explore Our Library
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Large Card: E-Books */}
            <div className="lg:col-span-2 bg-blue-50 rounded-2xl p-8 shadow-md bento-card flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-blue-600">E-Books</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Access thousands of digital books across genres, available
                  24/7.
                </p>
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full rounded-lg">
                Browse E-Books
              </Button>
            </div>
            {/* Medium Card: Audiobooks */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md bento-card">
              <div className="flex items-center mb-3">
                <Headphones className="w-8 h-8 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-blue-600">Audiobooks</h3>
              </div>
              <p className="text-gray-600">
                Listen to your favorite books on the go with our audiobook
                collection.
              </p>
            </div>
            {/* Small Card: Events */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md bento-card">
              <div className="flex items-center mb-3">
                <Calendar className="w-8 h-8 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-blue-600">Events</h3>
              </div>
              <p className="text-gray-600">
                Join our workshops, book clubs, and author talks.
              </p>
            </div>
            {/* Medium Card: Study Rooms */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md bento-card">
              <div className="flex items-center mb-3">
                <DoorOpen className="w-8 h-8 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-blue-600">
                  Study Rooms
                </h3>
              </div>
              <p className="text-gray-600">
                Reserve quiet spaces for study or group work.
              </p>
            </div>
            {/* Large Card: Membership */}
            <div className="lg:col-span-2 bg-blue-50 rounded-2xl p-8 shadow-md bento-card flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <UserPlus className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-blue-600">
                    Membership
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Join our community and unlock exclusive benefits and
                  resources.
                </p>
              </div>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 w-full rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Join Now
              </Button>
            </div>
            {/* Small Card: Kids Zone */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md bento-card">
              <div className="flex items-center mb-3">
                <ToyBrick className="w-8 h-8 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-blue-600">Kids Zone</h3>
              </div>
              <p className="text-gray-600">
                Fun and educational resources for young readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src="/src/assets/library-modern.jpg"
            alt="Library"
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 text-blue-600">About Us</h2>
          <p className="mb-6 text-gray-700 leading-relaxed text-lg">
            We are a modern library dedicated to providing access to a vast
            range of books and resources. Join thousands of members in exploring
            knowledge.
          </p>
          <div className="flex gap-12 mt-8 ">
            <div className="text-center border rounded-lg px-8 py-4">
              <h3 className="text-3xl font-bold text-blue-600">5,000+</h3>
              <p className="text-gray-600">Books</p>
            </div>
            <div className="text-center border rounded-lg px-8 py-4">
              <h3 className="text-3xl font-bold text-blue-600">1,000+</h3>
              <p className="text-gray-600">Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-600 tracking-tight">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
                <Mail className="w-7 h-7 text-blue-600" />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <a
                    href="mailto:library@example.com"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    library@example.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
                <Phone className="w-7 h-7 text-blue-600" />
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    011-123-456-7890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
                <MapPin className="w-7 h-7 text-blue-600" />
                <div>
                  <h3 className="font-bold text-lg">Address</h3>
                  <p className="text-gray-600">
                    123, Library St, Booktown, BK 12345
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 mt-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Send us a message
              </h3>
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-3 font-semibold transition-all duration-300 hover:scale-105"
                  onClick={() => setIsModalOpen(true)}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={modalBookId !== null}
        setIsOpen={() => setModalBookId(null)}
      >
        {modalBook && (
          <div className="p-8 relative" ref={modalRef}>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              onClick={() => setModalBookId(null)}
              title="Close"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <img
              src={modalBook.cover}
              alt={modalBook.title}
              className="w-full max-w-xs mx-auto h-64 object-cover rounded-lg mb-6 shadow-md"
            />
            <h3 className="text-2xl font-bold mb-3 text-center">
              {modalBook.title}
            </h3>
            <p className="mb-3 text-gray-700 text-center">
              Author: <span className="font-medium">{modalBook.author}</span>
            </p>
            <p className="mb-4 text-gray-700 text-center">
              Year: {modalBook.year}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {modalBook.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HomePage;
