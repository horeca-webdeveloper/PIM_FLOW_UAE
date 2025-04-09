import React from "react";

const PaginationComponent = ({ setPage, totalPages, changePage, currentPage }) => {
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    if (currentPage > 4) {
      // Show "..." after first page
      pages.push("...");
    }

    // Show previous page if applicable
    if (currentPage > 2) {
      pages.push(currentPage - 1);
    }

    // Show current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    // Show next four pages if available
    for (let i = 1; i <= 4; i++) {
      if (currentPage + i < totalPages) {
        pages.push(currentPage + i);
      }
    }

    if (currentPage + 4 < totalPages - 1) {
      // Show "..." before last page
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-end items-center gap-2 p-3 border-t border-[#BCBCBC]">
      {/* Previous Button */}
      <button type="button"
        className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Previous
      </button>

      {/* Page Number Buttons */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-sm">...</span>
        ) : (
          <button type="button"
            key={page}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === page ? "bg-[#26683A] text-white" : "bg-gray-200"
            }`}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button type="button"
        className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default React.memo(PaginationComponent);
