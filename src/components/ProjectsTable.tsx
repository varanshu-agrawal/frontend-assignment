import React from 'react';
import { Project } from '../hooks';

interface ProjectsTableProps {
    data: Project[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ data }) => {
    return (
        <div className="table-container">
            <table className="projects-table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage funded</th>
                        <th>Amount pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="no-records">No records found</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item["s.no"]}>
                                <td>{item["s.no"]}</td>
                                <td>{item["percentage.funded"]}</td>
                                <td>{item["amt.pledged"]}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectsTable;