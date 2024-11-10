import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface PaginationItemsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationItems: React.FC<PaginationItemsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Render page numbers, limiting to a maximum of 5 visible at a time
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        <ChevronFirst />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        <ChevronLeft />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        <ChevronLast />
      </button>
    </div>
  );
};

export default PaginationItems;
