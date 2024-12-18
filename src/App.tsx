import React, { useEffect, useState } from 'react';
import './App.css';
import ProjectsTable from './components/ProjectsTable.tsx';
import Pagination from './components/Pagination.tsx';
import { useSearchParams } from 'react-router-dom';
import { Project } from './hooks';

function App() {
    const [data, setData] = useState<Project[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const recordsPerPage = 5;

    const currentPageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const currentPage = isNaN(currentPageFromUrl) || currentPageFromUrl < 1 ? 1 : currentPageFromUrl;

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json")
            .then(res => res.json())
            .then((projects: Project[]) => {
                setData(projects);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const totalPages = Math.ceil(data.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentRecords = data.slice(startIndex, startIndex + recordsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setSearchParams({ page: String(currentPage - 1) });
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setSearchParams({ page: String(currentPage + 1) });
        }
    };

    return (
        <div className="app-container">
            <h1 className="header-title">Kickstarter Projects</h1>
            <ProjectsTable data={currentRecords} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={goToPreviousPage}
                onNext={goToNextPage}
            />
        </div>
    );
}

export default App;