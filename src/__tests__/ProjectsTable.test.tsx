import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectsTable from '../components/ProjectsTable';
import { Project } from '../hooks';

describe('ProjectsTable', () => {
    test('renders no records found when data is empty', () => {
        render(<ProjectsTable data={[]} />);
        expect(screen.getByText(/No records found/i)).toBeInTheDocument();
    });

    test('renders projects data when provided', () => {
        const mockData: Project[] = [
            { "s.no": 1, "percentage.funded": 100, "amt.pledged": 5000 },
            { "s.no": 2, "percentage.funded": 150, "amt.pledged": 10000 },
        ];
        render(<ProjectsTable data={mockData} />);

        expect(screen.queryByText(/No records found/i)).not.toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('5000')).toBeInTheDocument();

        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('150')).toBeInTheDocument();
        expect(screen.getByText('10000')).toBeInTheDocument();
    });
});