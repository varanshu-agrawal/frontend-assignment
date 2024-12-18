import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
    test('does not render if totalPages <= 1', () => {
        const { container } = render(
            <Pagination
                currentPage={1}
                totalPages={1}
                onPrevious={jest.fn()}
                onNext={jest.fn()}
            />
        );
        // container should have nothing related to pagination controls
        expect(container).toBeEmptyDOMElement();
    });

    test('renders pagination if totalPages > 1', () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={3}
                onPrevious={jest.fn()}
                onNext={jest.fn()}
            />
        );
        expect(screen.getByText(/Page 1 of 3/i)).toBeInTheDocument();
        expect(screen.getByText(/Previous/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();
    });

    test('disables Previous button on the first page', () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={3}
                onPrevious={jest.fn()}
                onNext={jest.fn()}
            />
        );
        expect(screen.getByText('Previous')).toBeDisabled();
        expect(screen.getByText('Next')).not.toBeDisabled();
    });

    test('disables Next button on the last page', () => {
        render(
            <Pagination
                currentPage={3}
                totalPages={3}
                onPrevious={jest.fn()}
                onNext={jest.fn()}
            />
        );
        expect(screen.getByText('Next')).toBeDisabled();
        expect(screen.getByText('Previous')).not.toBeDisabled();
    });

    test('calls onPrevious and onNext callbacks when buttons are clicked', () => {
        const mockOnPrevious = jest.fn();
        const mockOnNext = jest.fn();
        render(
            <Pagination
                currentPage={2}
                totalPages={3}
                onPrevious={mockOnPrevious}
                onNext={mockOnNext}
            />
        );
        const prevButton = screen.getByText('Previous');
        const nextButton = screen.getByText('Next');

        fireEvent.click(prevButton);
        expect(mockOnPrevious).toHaveBeenCalled();

        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });
});