import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../customStyles/EditPart.css';

const EditPart = ({ handleBack }) => {
  const [parts, setParts] = useState([]);
  const [partNumbers, setPartNumbers] = useState([]);
  const [selectedPartNumber, setSelectedPartNumber] = useState('');
  const [partData, setPartData] = useState({
    part_description: '',
    quantity: '',
    country_of_origin: '',
    euro_price_per_unit: '',
    weight_per_unit_kg: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchParts = () => {
    axios.get(`${API_URL}/parts`)
      .then(response => {
        const partsData = response.data;
        if (Array.isArray(partsData)) {
          setParts(partsData);
          setPartNumbers(partsData.map(part => part.part_number));
          setLoading(false);
        } else {
          console.error('Error: response.data is not an array');
          toast.error('Failed to fetch parts.');
          setLoading(false);
        }
      })
      .catch(error => {
        console.error("Error fetching parts:", error.message);
        toast.error('Failed to fetch parts.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchParts();
  }, []);

  useEffect(() => {
    if (selectedPartNumber) {
      setLoading(true);
      axios.get(`${API_URL}/parts/${selectedPartNumber}`)
        .then(response => {
          const data = response.data;
          if (Array.isArray(data) && data.length > 0) {
            const part = data[0]; // Access the first element of the array
            setPartData({
              part_description: part.part_description || '',
              quantity: part.quantity || '',
              country_of_origin: part.country_of_origin || '',
              euro_price_per_unit: part.euro_price_per_unit || '',
              weight_per_unit_kg: part.weight_per_unit_kg || ''
            });
          } else {
            console.error('Unexpected data format:', data);
            toast.error('Failed to fetch part data.');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching part data:", error.message);
          toast.error('Failed to fetch part data.');
          setLoading(false);
        });
    }
  }, [selectedPartNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdatePart = () => {
    axios.put(`${API_URL}/parts/edit/${selectedPartNumber}`, partData)
      .then(response => {
        if (response.status === 200) {
          toast.success('Updated successfully!');
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || 'Failed to update part.';
          toast.error(errorMessage);
        } else {
          console.error("Error updating part:", error.message);
          toast.error('Failed to update part.');
        }
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="edit-part-card" className="card">
        <h2>Edit Part Data</h2>
        <select
          id="select-part-number"
          value={selectedPartNumber}
          onChange={(e) => setSelectedPartNumber(e.target.value)}
          className="input-field"
        >
          <option value="">Select Part Number</option>
          {partNumbers.map((partNumber, index) => (
            <option key={index} value={partNumber}>{partNumber}</option>
          ))}
        </select>

        {selectedPartNumber && (
          <div>
            <label htmlFor="part_description">Description:</label>
            <input
              type="text"
              id="part_description"
              name="part_description"
              value={partData.part_description}
              onChange={handleInputChange}
              placeholder="Part Description"
              className="input-field"
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={partData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="input-field"
            />
            <label htmlFor="country_of_origin">Country of Origin:</label>
            <input
              type="text"
              id="country_of_origin"
              name="country_of_origin"
              value={partData.country_of_origin}
              onChange={handleInputChange}
              placeholder="Country of Origin"
              className="input-field"
            />
            <label htmlFor="euro_price_per_unit">Price per Unit (€):</label>
            <input
              type="number"
              step="0.01"
              id="euro_price_per_unit"
              name="euro_price_per_unit"
              value={partData.euro_price_per_unit}
              onChange={handleInputChange}
              placeholder="Euro Price Per Unit"
              className="input-field"
            />
            <label htmlFor="weight_per_unit_kg">Weight per Unit (kg):</label>
            <input
              type="number"
              step="0.01"
              id="weight_per_unit_kg"
              name="weight_per_unit_kg"
              value={partData.weight_per_unit_kg}
              onChange={handleInputChange}
              placeholder="Weight Per Unit (kg)"
              className="input-field"
            />
            <button onClick={handleUpdatePart} className="button">Update Part</button>
          </div>
        )}
        <button onClick={handleBack} className="button">Return to Dashboard</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditPart;
