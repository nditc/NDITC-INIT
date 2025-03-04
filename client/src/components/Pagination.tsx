import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };
  const renderPageNumbers = () => {
    const pages = [];
    const createButton = (page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm ${
          page === currentPage
            ? "bg-primary-400 text-white"
            : "bg-secondary-600 text-white hover:bg-primary-500"
        }`}
      >
        {page}
      </button>
    );

    pages.push(createButton(1));
    if (currentPage > 3) pages.push(<span key="start-dots" className="text-secondary-200">...</span>);

    for (let page = Math.max(2, currentPage - 1); page <= Math.min(totalPages - 1, currentPage + 1); page++) {
      pages.push(createButton(page));
    }

    if (currentPage < totalPages - 2) pages.push(<span key="end-dots" className="text-secondary-200">...</span>);
    if (totalPages > 1) pages.push(createButton(totalPages));

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm text-white ${
          currentPage === 1 ? "bg-secondary-600 cursor-not-allowed" : "bg-primary-400 hover:bg-primary-500"
        }`}
      >
        <FaChevronLeft className="mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <div className="flex space-x-1 sm:space-x-2">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm text-white ${
          currentPage === totalPages ? "bg-secondary-600 cursor-not-allowed" : "bg-primary-400 hover:bg-primary-500"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <FaChevronRight className="ml-1 sm:ml-2" />
      </button>
    </div>
  );
};

export default Pagination;