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
                className="arrow" id="prevPage"
                onClick={onPrevious}
                disabled={currentPage === 1}
            >← <span className="nav-text">PREV</span></button>
            <span className="pagination-info">Page {currentPage} of {totalPages}</span>
            <button
                className="arrow" id="prevPage"
                disabled={currentPage === totalPages}
                onClick={onNext}
            ><span className="nav-text">NEXT</span> →</button>
        </div>
    );
}

export default Pagination;