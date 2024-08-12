import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../customStyles/Report.css';

const Report = ({ user, handleBack }) => {
    const [parts, setParts] = useState([]);
    const [selectedPartNumber, setSelectedPartNumber] = useState('');
    const [historyData, setHistoryData] = useState([]);
    const [reportName, setReportName] = useState('');
    const chartRef = useRef(null); // Reference to the chart container

    useEffect(() => {
        // Fetch all parts for dropdown
        axios.get(`${API_URL}/parts`)
            .then(response => setParts(response.data))
            .catch(error => console.error("Error fetching parts:", error.message));
    }, []);

    useEffect(() => {
        if (selectedPartNumber) {
            // Fetch history for the selected part number
            axios.get(`${API_URL}/history/${selectedPartNumber}`)
                .then(response => {
                    setHistoryData(response.data);
                })
                .catch(error => {
                    setHistoryData([]); // Clear history data on error
                });
        } else {
            setHistoryData([]); // Clear history data if no part is selected
        }
    }, [selectedPartNumber]);

    const handlePartSelection = (event) => {
        setSelectedPartNumber(event.target.value);
    };

    const handleSaveReport = () => {
        if (reportName.trim()) {
            // Generate PDF from the chart
            html2canvas(chartRef.current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                
                // Specify the width and height of the image
                const imgWidth = 150; // Width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
                
                // Add chart image with smaller size
                pdf.addImage(imgData, 'PNG', 10, 40, imgWidth, imgHeight);
                
                // Add text for report name, user, and part number
                pdf.setFontSize(12);
                pdf.text(`Report Name: ${reportName}`, 10, 10); // Position for report name
                pdf.text(`Created By: User ID ${user.userId}`, 10, 20); // Position for user ID
                pdf.text(`Part Number: ${selectedPartNumber}`, 10, 30); // Position for part number
    
                // Save the PDF
                const pdfOutput = pdf.output('blob');
                
                const formData = new FormData();
                formData.append('employee_id', user.userId);
                formData.append('report_name', reportName);
                formData.append('report_data', pdfOutput, `${reportName}.pdf`); // Add PDF file as Blob
        
                axios.post(`${API_URL}/reports/save`, formData)
                    .then(() => {
                        toast.success("Report saved successfully!");
                        setReportName('');
                    })
                    .catch(() => toast.error("Error saving report."));
            });
        } else {
            toast.error("Please enter a report name.");
        }
    };
    

    // Process data for visualization
    const quantityChartData = {
        labels: historyData.map(item => new Date(item.changed_at).toLocaleDateString()),
        datasets: [
            {
                label: 'Quantity Changes',
                data: historyData.map(item => item.new_quantity || 0),
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                borderColor: 'rgba(128, 128, 128, 1)',
                borderWidth: 1,
            },
        ],
    };

    const priceChartData = {
        labels: historyData.map(item => new Date(item.changed_at).toLocaleDateString()),
        datasets: [
            {
                label: 'Price Changes',
                data: historyData.map(item => ({
                    x: new Date(item.changed_at).toLocaleDateString(), // X axis (date)
                    y: item.new_euro_price_per_unit || 0, // Y axis (price)
                })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.1, // Smooth the line
                pointRadius: 5, // Increase point size for better visibility
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
            },
        ],
    };

    const quantityChartOptions = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                },
            },
        },
    };

    const priceChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                type: 'category',
                labels: historyData.map(item => new Date(item.changed_at).toLocaleDateString()),
                beginAtZero: false,
                ticks: {
                    autoSkip: false,
                    maxTicksLimit: 10,
                },
            },
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 0.1,
                    maxTicksLimit: 5,
                },
            },
        },
    };

    return (
        <div id="part-history-report">
            <button onClick={handleBack} id="back-btn">
                Back to Dashboard
            </button>
            <h2>Part History Report</h2>
            <div id="dropdown-container">
                <label htmlFor="part-select">Select Part:</label>
                <select
                    id="part-select"
                    value={selectedPartNumber}
                    onChange={handlePartSelection}
                >
                    <option value="">Select a part</option>
                    {parts.map(part => (
                        <option key={part.part_number} value={part.part_number}>
                            {part.part_description}
                        </option>
                    ))}
                </select>
            </div>
            {selectedPartNumber && historyData.length === 0 ? (
                <p>No history available for this part number.</p>
            ) : (
                <div id="chart-container" ref={chartRef}>
                    {historyData.length > 0 && (
                        <>
                            <div id="quantity-chart">
                                <h3>Quantity Changes</h3>
                                <Bar data={quantityChartData} options={quantityChartOptions} />
                            </div>
                            <div id="price-chart">
                                <h3>Price Changes</h3>
                                <Line data={priceChartData} options={priceChartOptions} />
                            </div>
                        </>
                    )}
                </div>
            )}
            <div id="save-report">
                <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Enter report name"
                />
                <button onClick={handleSaveReport} id="save-report-btn">
                    Save Report
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Report;
