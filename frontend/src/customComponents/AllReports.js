import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config';
import '../customStyles/AllReports.css';

const ViewReports = ({ handleBack }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${API_URL}/reports/all`);
                setReports(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) return <div id="loading-message">Loading...</div>;
    if (error) return <div id="error-message">Error: {error}</div>;

    return (
        <div id="view-reports-container">
            <button id="back-button" onClick={handleBack}>Back to Dashboard</button>
            <h2 id="reports-heading">All Reports</h2>
            <table id="reports-table">
                <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Employee ID</th>
                        <th>Report Name</th>
                        <th>Time Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.report_id}>
                            <td>{report.report_id}</td>
                            <td>{report.employee_id}</td>
                            <td>{report.report_name}</td>
                            <td>{new Date(report.time_created).toLocaleString()}</td>
                            <td>
                                <button onClick={() => downloadReport(report.report_id)}>Download</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    function downloadReport(reportId) {
        axios.get(`${API_URL}/reports/download/${reportId}`, {
            responseType: 'blob',
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report_${reportId}.bin`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(err => {
            console.error("Error downloading report:", err);
            alert("Failed to download the report.");
        });
    }
};

export default ViewReports;
