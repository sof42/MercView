import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config';
import '../customStyles/CompatibilityCheck.css';

const CheckCompatibility = ({ handleBack }) => {
    const [partNumber, setPartNumber] = useState('');
    const [partOptions, setPartOptions] = useState([]);
    const [partDescription, setPartDescription] = useState('');
    const [compatibility, setCompatibility] = useState([]);
    const [error, setError] = useState(null);

    // Fetch part numbers for the dropdown
    useEffect(() => {
        const fetchPartOptions = async () => {
            try {
                const response = await axios.get(API_URL+'/parts'); // Adjust endpoint as needed
                setPartOptions(response.data);
            } catch (err) {
                console.error('Error fetching part options:', err);
            }
        };

        fetchPartOptions();
    }, []);

    // Handle part number change
    const handlePartNumberChange = async (e) => {
        const selectedPartNumber = e.target.value;
        setPartNumber(selectedPartNumber);

        if (selectedPartNumber) {
            try {
                // Fetch part description
                const partResponse = await axios.get(API_URL + `/parts/${selectedPartNumber}`);
                if (partResponse.data && partResponse.data.length > 0) {
                    setPartDescription(partResponse.data[0].part_description || 'No description available');
                } else {
                    setPartDescription('No description available');
                }

                // Fetch part compatibility
                const compatibilityResponse = await axios.get(API_URL + `/parts/compatibility/${selectedPartNumber}`);
                console.log("Compatibility response:", compatibilityResponse.data); // Log the response data
                if (Array.isArray(compatibilityResponse.data)) {
                    setCompatibility(compatibilityResponse.data);
                    setError(null);
                } else {
                    setCompatibility([]);
                    setError('Unexpected response format');
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setCompatibility([]);
                setError('No compatible car models found');
            }
        } else {
            setPartDescription('');
            setCompatibility([]);
            setError(null);
        }
    };

    return (
        <div className="part-compatibility-check">
            <h2>Check Part Compatibility</h2>
            <label htmlFor="part-number">Select Part Number:</label>
            <select id="part-number" value={partNumber} onChange={handlePartNumberChange}>
                <option value="">--Select a Part--</option>
                {partOptions.map((part) => (
                    <option key={part.part_number} value={part.part_number}>
                        {part.part_number}
                    </option>
                ))}
            </select>

            {partDescription && (
                <div className="part-description">
                    <h3>Part Description:</h3>
                    <p>{partDescription}</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {compatibility.length > 0 && (
                <div className="compatibility-results">
                    <h3>Compatible Car Models:</h3>
                    <ul>
                        {compatibility.map((model, index) => (
                            <li key={index}>{model.car_model_name || 'Unknown model'}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={handleBack} className="back-button">Back to Dashboard</button>
        </div>
    );
};

export default CheckCompatibility;
