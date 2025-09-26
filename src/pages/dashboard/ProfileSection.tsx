import React from 'react';
import { User } from 'lucide-react';
import Button from '../../components/Button';

const ProfileSection: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6 max-w-md mx-auto text-center">
      <User className="w-20 h-20 mx-auto text-blue-600 mb-4" />
      <h2 className="text-2xl font-bold">Admin User</h2>
      <p className="text-gray-600">admin@library.com</p>
      <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileSection;