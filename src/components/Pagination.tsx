import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrevious, onNext }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <button
                className="pagination-button"
                onClick={onPrevious}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="pagination-info">Page {currentPage} of {totalPages}</span>
            <button
                className="pagination-button"
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;