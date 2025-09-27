import Skeleton from '../components/Skeleton';

const TableSkeleton = () => {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Title</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Author</th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Description</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-3 sm:py-4">
                  <Skeleton className="h-4 w-48" />
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;