import React from "react";

const PaginationComponent = ({
  setPage,
  totalPages,
  changePage,
  currentPage,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;

    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always include the first page
    pages.push(1);

    // Add ellipsis if there's a gap after 1
    if (range[0] > 2) {
      pages.push("...");
    }

    // Add range pages
    pages.push(...range);

    // Add ellipsis if there's a gap before the last page
    if (range[range.length - 1] < totalPages - 1) {
      pages.push("...");
    }

    // Always include the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-end items-center gap-2 p-3 border-t border-[#BCBCBC]">
      {/* Previous Button */}
      <button
        type="button"
        className="px-3 py-1 text-5m bg[12px]gray-2md rounded-full disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Previous
      </button>

      {/* Page Number Buttons */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1 text-sm">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            type="button"
            className={`px-5 py-[12px] text-md rounded-full ${
              currentPage === page ? "bg-[#26683A] text-white" : "bg-gray-200"
            }`}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        type="button"
        className="px-3 py-1 text-5m bg[12px]gray-2md rounded-full disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default React.memo(PaginationComponent);
