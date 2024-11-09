import React from 'react';

interface LoadingIndicatorProps {
  isShown: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isShown }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-25 flex items-center justify-center transition-opacity duration-300 z-30 ${
        isShown ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-white text-4xl animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400">
      </div>
    </div>
  );
};

export default LoadingIndicator;
