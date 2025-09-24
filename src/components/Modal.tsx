import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignUp = () => {
    setIsOpen(false);
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        {isSignUp && <Input label="Confirm Password" type="password" />}
        <div className="flex justify-between mt-4">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={isSignUp ? handleSignUp : () => setIsOpen(false)}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            className="bg-gray-300 text-gray-700 hover:bg-gray-400"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </Button>
        </div>
        <Button
          className="mt-4 w-full bg-red-500 text-white hover:bg-red-600"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;