import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md animate-pulse flex flex-col gap-3">
            <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="flex justify-between items-center mt-2">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
            </div>
          </div>
        );
        
      case 'list':
        return (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
              <div className="flex flex-col gap-2">
                <div className="h-5 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-8 bg-gray-200 rounded-xl w-20"></div>
          </div>
        );

      case 'chart':
        return (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md animate-pulse flex flex-col gap-4 h-80">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="flex-1 w-full bg-gray-100 rounded-xl flex items-end justify-between p-4 gap-2">
              <div className="h-[20%] w-[12%] bg-gray-200 rounded-t"></div>
              <div className="h-[60%] w-[12%] bg-gray-200 rounded-t"></div>
              <div className="h-[40%] w-[12%] bg-gray-200 rounded-t"></div>
              <div className="h-[80%] w-[12%] bg-gray-200 rounded-t"></div>
              <div className="h-[50%] w-[12%] bg-gray-200 rounded-t"></div>
              <div className="h-[75%] w-[12%] bg-gray-200 rounded-t"></div>
              <div className="h-[90%] w-[12%] bg-gray-200 rounded-t"></div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md animate-pulse flex flex-col items-center gap-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="w-full border-t border-gray-100 pt-4 flex justify-around">
              <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
              <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
            </div>
          </div>
        );

      default:
        return <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <React.Fragment key={idx}>{renderSkeleton()}</React.Fragment>
      ))}
    </>
  );
};

export default SkeletonLoader;
