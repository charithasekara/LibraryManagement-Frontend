import React from 'react';

interface Activity {
  id: number;
  message: string;
  time: string;
}

interface ActivitySectionProps {
  activities: Activity[];
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{activity.message}</span>
            <span className="text-gray-500 text-sm">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitySection;