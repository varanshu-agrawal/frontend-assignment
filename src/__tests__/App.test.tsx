import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { Project } from '../hooks';
global.fetch = jest.fn();

const mockData: Project[] = [
    { "s.no": 0, "percentage.funded": 186, "amt.pledged": 15283 },
    { "s.no": 1, "percentage.funded": 120, "amt.pledged": 1000 },
    { "s.no": 2, "percentage.funded": 90, "amt.pledged": 5000 },
    { "s.no": 3, "percentage.funded": 300, "amt.pledged": 20000 },
    { "s.no": 4, "percentage.funded": 50, "amt.pledged": 800 },
    { "s.no": 5, "percentage.funded": 70, "amt.pledged": 700 },
];

describe('App', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(mockData),
        });
    });

    test('fetches and displays the first 5 records', async () => {
        render(<App />);

        // Wait for the table to render data
        await waitFor(() => {
            // Check for a unique value from the mockData
            expect(screen.getByText('186')).toBeInTheDocument();
        });

        // Should render first 5 records per page
        expect(screen.queryByText('70')).not.toBeInTheDocument(); // 6th record not on first page

        // Pagination should be present (since we have more than 5 records)
        expect(screen.getByText(/Page 1 of 2/i)).toBeInTheDocument();
    });
});