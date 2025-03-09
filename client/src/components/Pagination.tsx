import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  perPage: number;
  totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  perPage,
  totalCount,
}) => {
  const totalPages = Math.ceil(totalCount / perPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };
  const renderPageNumbers = () => {
    const pages = [];
    const createButton = (page: number) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`rounded-md px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
          page === currentPage
            ? "bg-primary-400 text-white"
            : "bg-secondary-600 text-white hover:bg-primary-500"
        }`}
      >
        {page}
      </button>
    );

    pages.push(createButton(1));
    if (currentPage > 3)
      pages.push(
        <span key="start-dots" className="text-secondary-200">
          ...
        </span>,
      );

    for (
      let page = Math.max(2, currentPage - 1);
      page <= Math.min(totalPages - 1, currentPage + 1);
      page++
    ) {
      pages.push(createButton(page));
    }

    if (currentPage < totalPages - 2)
      pages.push(
        <span key="end-dots" className="text-secondary-200">
          ...
        </span>,
      );
    if (totalPages > 1) pages.push(createButton(totalPages));

    return pages;
  };

  return (
    <div className="mt-4 flex items-center justify-center space-x-2 sm:space-x-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center rounded-md px-2 py-1.5 text-xs text-white sm:px-3 sm:py-2 sm:text-sm ${
          currentPage === 1
            ? "cursor-not-allowed bg-secondary-600"
            : "bg-primary-400 hover:bg-primary-500"
        }`}
      >
        <FaChevronLeft className="mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <div className="flex space-x-1 sm:space-x-2">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center rounded-md px-2 py-1.5 text-xs text-white sm:px-3 sm:py-2 sm:text-sm ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-secondary-600"
            : "bg-primary-400 hover:bg-primary-500"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <FaChevronRight className="ml-1 sm:ml-2" />
      </button>
      <p className={"text-sm text-white/60"}>
        {(currentPage - 1) * perPage + 1} -{" "}
        {Math.min(totalCount, currentPage * perPage)} of {totalCount}
      </p>
    </div>
  );
};

export default Pagination;
