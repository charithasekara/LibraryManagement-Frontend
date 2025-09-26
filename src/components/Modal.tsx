import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  showCancel?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  showCancel = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          title="Close modal"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        
        {children}
        
        {/* <div className="flex justify-end gap-2 mt-6">
          {showCancel && (
            <Button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button
              onClick={onSubmit}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {submitText}
            </Button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Modal;