import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm ${
              page === currentPage
                ? "bg-primary-400 text-white"
                : "bg-secondary-600 text-white hover:bg-primary-500"
            }`}
          >
            {page}
          </button>
        );
      });
    }

    const pages = [];
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm ${
          currentPage === 1
            ? "bg-primary-400 text-white"
            : "bg-secondary-600 text-white hover:bg-primary-500"
        }`}
      >
        1
      </button>
    );

    if (currentPage > 3) {
      pages.push(
        <span key="start-dots" className="px-1 sm:px-2 text-secondary-600">
          ...
        </span>
      );
    }
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1); 

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm ${
            page === currentPage
              ? "bg-primary-400 text-white"
              : "bg-secondary-600 text-white hover:bg-primary-500"
          }`}
        >
          {page}
        </button>
      );
    }
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="end-dots" className="px-1 sm:px-2 text-secondary-600">
          ...
        </span>
      );
    }
    pages.push(
      <button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm ${
          currentPage === totalPages
            ? "bg-primary-400 text-white"
            : "bg-secondary-600 text-white hover:bg-primary-500"
        }`}
      >
        {totalPages}
      </button>
    );

    return pages;
  };
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm text-white ${
          currentPage === 1
            ? "bg-secondary-600 cursor-not-allowed"
            : "bg-primary-400 hover:bg-primary-500"
        }`}
      >
        <FaChevronLeft className="mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <div className="flex space-x-1 sm:space-x-2">{renderPageNumbers()}</div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm text-white ${
          currentPage === totalPages
            ? "bg-secondary-600 cursor-not-allowed"
            : "bg-primary-400 hover:bg-primary-500"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <FaChevronRight className="ml-1 sm:ml-2" />
      </button>
    </div>
  );
};

export default Pagination;