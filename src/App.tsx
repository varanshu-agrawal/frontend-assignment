import React, { useEffect, useState } from 'react';
import './App.css';
import ProjectsTable from './components/ProjectsTable.tsx';
import Pagination from './components/Pagination.tsx';
import { Project } from './hooks';

function App() {
    const [data, setData] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage = 5;

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
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
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