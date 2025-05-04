import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export const Pagination = ({ current_page, last_page, setPage, page }) => {
  const handlePrev = () => {
    if (current_page > 1) {
      setPage(current_page - 1);
    }
  };

  const handleNext = () => {
    if (current_page < last_page) {
      setPage(current_page + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== "...") {
      setPage(pageNumber);
    }
  };

  // Function to generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Total visible numbered pages

    // Always show first page
    pages.push(1);

    // Calculate start and end of the visible range
    let rangeStart = Math.max(2, current_page - 1);
    let rangeEnd = Math.min(last_page - 1, current_page + 1);

    // Adjust range if at the beginning or end
    if (current_page <= 2) {
      rangeEnd = Math.min(last_page - 1, maxVisiblePages - 1);
    } else if (current_page >= last_page - 2) {
      rangeStart = Math.max(2, last_page - maxVisiblePages + 2);
    }

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push("...");
    }

    // Add pages in the visible range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < last_page - 1) {
      pages.push("...");
    }

    // Always show last page if there is more than one page
    if (last_page > 1) {
      pages.push(last_page);
    }

    return pages;
  };

  return (
    <div className="block w-full text-center">
      <div className="mb-8 w-full inline-flex flex-row justify-center flex-wrap items-center rounded-[4px]">
        {/* Previous button */}
        <span
          style={{ opacity: current_page === 1 ? "0.3" : "1" }}
          className="cursor-pointer text-[#64748B] flex items-center flex-row text-sm p-[10px] sm:p-5 font-bold uppercase"
          onClick={current_page > 1 ? handlePrev : undefined}
        >
          <FaChevronLeft className="mr-2" color="#64748B" size={"12px"} />{" "}
          Previous
        </span>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, index) => (
          <span
            key={index}
            onClick={() => handlePageClick(pageNum)}
            className={`flex items-center justify-center border-transparent border transition-all hover:border-[#030303]  cursor-pointer rounded-full sm:rounded-0 py-[0px] px-[0px] sm:py-4 sm:px-6 block ${
              pageNum === current_page
                ? "bg-[#26683A] text-white"
                : "text-[#030303]"
            } ${
              pageNum === "..." ? "cursor-default hover:border-transparent" : ""
            }`}
          >
            <span>{pageNum}</span>
          </span>
        ))}

        {/* Next button */}
        <span
          style={{ opacity: current_page >= last_page ? "0.3" : "1" }}
          className="cursor-pointer text-[#64748B] flex items-center flex-row text-sm p-[10px] sm:p-5 font-bold uppercase"
          onClick={current_page < last_page ? handleNext : undefined}
        >
          Next <FaChevronRight className="ml-2" color="#64748B" size={"12px"} />
        </span>
      </div>
    </div>
  );
};
