import React from 'react';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
    const generatePages = () => {
        const pages = [];

        // Always show the first page
        pages.push(1);

        if (totalPage <= 7) {
            // Show all pages if total pages are less than or equal to 7
            for (let i = 2; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 4) pages.push('...');

            // Dynamic middle pages
            const start = Math.max(2, currentPage - 1); // Hide previous number if more pages exist
            const end = Math.min(totalPage - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPage - 3) pages.push('...');
            pages.push(totalPage);
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div className="pagination flex items-center justify-center gap-2 md:gap-4">
            {/* Previous Button */}
            <button
                className="hover:bg-[#115e59] px-4 py-1 rounded-md hover:text-white transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <MdNavigateBefore />
                <span className="hidden md:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
                {pages.map((page, index) =>
                    page === '...' ? (
                        <span key={index} className="px-2 text-gray-500">...</span>
                    ) : (
                        <button
                            key={index}
                            className={`px-3 py-2 rounded-md transition min-w-[32px] ${
                                page === currentPage
                                    ? 'bg-[#115e59] text-white font-semibold'
                                    : 'bg-gray-200 text-black hover:bg-gray-300'
                            }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next Button */}
            <button
                className="hover:bg-[#115e59] px-4 py-1 rounded-md hover:text-white transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <span className="hidden md:inline">Next</span>
                <MdNavigateNext />
            </button>
        </div>
    );
};

export default Pagination;
