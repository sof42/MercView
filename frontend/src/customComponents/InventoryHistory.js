import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {API_URL} from './utils/config';
import '../customStyles/InventoryHistory.css';

const InventoryHistory = ({ handleBack }) => {
    const [partNumber, setPartNumber] = useState('');
    const [history, setHistory] = useState([]);
    const [partNumbers, setPartNumbers] = useState([]);

    // Fetch list of part numbers for the dropdown
    useEffect(() => {
        axios.get(API_URL + '/parts') // Adjust the endpoint if needed
            .then(response => {
                setPartNumbers(response.data.map(part => part.part_number));
            })
            .catch(error => {
                console.error("Error fetching parts:", error.message);
            });
    }, []);

    // Fetch history when partNumber changes
    useEffect(() => {
        if (partNumber) {
            axios.get(API_URL + `/history/${partNumber}`)
                .then(response => {
                    setHistory(response.data);
                })
                .catch(error => {
                    console.error("Error fetching part history:", error.message);
                });
        } else {
            setHistory([]); // Clear history if no part number is selected
        }
    }, [partNumber]);

    const handlePartNumberChange = (event) => {
        setPartNumber(event.target.value);
        setHistory([]); // Clear history when a new part number is selected
    };

    return (
        <div>
            <h2>Inventory History</h2>

            <div>
                <label htmlFor="partNumber">Select Part Number:</label>
                <select
                    id="partNumber"
                    value={partNumber}
                    onChange={handlePartNumberChange}
                >
                    <option value="">Select a part number</option>
                    {partNumbers.map(part => (
                        <option key={part} value={part}>{part}</option>
                    ))}
                </select>
            </div>

            {partNumber && history.length > 0 ? (
                <div>
                    <h3>History for Part Number: {partNumber}</h3>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Changed At</th>
                                <th>Action Type</th>
                                <th>Old Description</th>
                                <th>New Description</th>
                                <th>Old Quantity</th>
                                <th>New Quantity</th>
                                <th>Old Country</th>
                                <th>New Country</th>
                                <th>Old Price</th>
                                <th>New Price</th>
                                <th>Old Weight</th>
                                <th>New Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry, index) => (
                                <tr key={index}>
                                    <td>{new Date(entry.changed_at).toLocaleString()}</td>
                                    <td>{entry.action_type}</td>
                                    <td>{entry.old_part_description}</td>
                                    <td>{entry.new_part_description}</td>
                                    <td>{entry.old_quantity}</td>
                                    <td>{entry.new_quantity}</td>
                                    <td>{entry.old_country_of_origin}</td>
                                    <td>{entry.new_country_of_origin}</td>
                                    <td>{entry.old_euro_price_per_unit}</td>
                                    <td>{entry.new_euro_price_per_unit}</td>
                                    <td>{entry.old_weight_per_unit_kg}</td>
                                    <td>{entry.new_weight_per_unit_kg}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : partNumber ? (
                <p style={{ color: 'red' }}>No history available for the selected part number.</p>
            ) : null}

            <button onClick={handleBack} className="go-back-button">
                Back to Dashboard
            </button>
        </div>
    );
};

export default InventoryHistory;
