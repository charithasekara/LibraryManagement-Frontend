import React from 'react';

interface AnalyticsSectionProps {
  analytics: {
    totalBooks: number;
    activeUsers: number;
    borrowedToday: number;
    overdue: number;
  };
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ analytics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Object.entries(analytics).map(([key, value]) => (
        <div key={key} className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-blue-600">{value}</p>
          <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsSection;