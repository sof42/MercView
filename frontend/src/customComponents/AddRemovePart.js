import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../customStyles/AddRemovePart.css';
import { API_URL } from './utils/config';

const countryOptions = [
  "USA",
  "Canada",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Norway",
  "Sweden"
];

const AddRemovePart = ({ handleBack }) => {
  const [newPart, setNewPart] = useState({
    partDescription: '',
    quantity: '',
    countryOfOrigin: '',
    euroPricePerUnit: '',
    weightPerUnitKg: ''
  });

  const [parts, setParts] = useState([]);
  const [partNumberToRemove, setPartNumberToRemove] = useState('');
  const [partNumbers, setPartNumbers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPart((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPart = () => {
    const { partDescription, quantity, countryOfOrigin, euroPricePerUnit, weightPerUnitKg } = newPart;

    if (!partDescription || !quantity || !countryOfOrigin || !euroPricePerUnit || !weightPerUnitKg) {
      toast.error('Please fill in all fields.');
      return;
    }

    axios.post(API_URL + '/parts/insert', {
      part_description: partDescription,
      quantity,
      country_of_origin: countryOfOrigin,
      euro_price_per_unit: euroPricePerUnit,
      weight_per_unit_kg: weightPerUnitKg
    })
      .then(response => {
        if (response.status === 201) {
          toast.success('Part added successfully!');
          setNewPart({
            partDescription: '',
            quantity: '',
            countryOfOrigin: '',
            euroPricePerUnit: '',
            weightPerUnitKg: ''
          });
          fetchParts();
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || 'Failed to add part.';
          toast.error(errorMessage);
        } else {
          console.error("Error adding part:", error.message);
          toast.error('Failed to add part.');
        }
      });
  };

  const handleRemovePart = async () => {
    try {
      const response = await axios.delete(API_URL + `/parts/remove/${partNumberToRemove}`);

      if (response.status === 200) {
        toast.success('Part removed successfully!');
        setPartNumberToRemove('');
        await fetchParts();
      } else if (response.status === 404) {
        toast.error('Part not found. Incorrect part number.');
      } else {
        toast.error('Unexpected response status.');
      }
    } catch (error) {
      console.error('Error removing part:', error.message);
      toast.error('Failed to remove part.');
    }
  };

  const fetchParts = () => {
    axios.get(API_URL + '/parts')
      .then(response => {  
        const partsData = response.data;
        if (Array.isArray(partsData)) {
          setParts(partsData);
          setPartNumbers(partsData.map(part => part.part_number));
        } else {
          console.error('Error: response.data is not an array');
          toast.error('Failed to fetch parts.');
        }
      })
      .catch(error => {
        console.error("Error fetching parts:", error.message);
        toast.error('Failed to fetch parts.');
      });
  };

  useEffect(() => {
    fetchParts();
  }, []);

  return (
    <div>
      <div id="add-remove-part-container">
        <div id="add-part-card" className="card">
          <h2>Add Part</h2>
          <input
            id="part-description-input"
            type="text"
            name="partDescription"
            value={newPart.partDescription}
            onChange={handleInputChange}
            placeholder="Part Description"
            className="input-field"
          />
          <input
            id="quantity-input"
            type="number"
            name="quantity"
            value={newPart.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="input-field"
          />
          <select
            id="country-of-origin-input"
            name="countryOfOrigin"
            value={newPart.countryOfOrigin}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">Select Country</option>
            {countryOptions.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          <input
            id="euro-price-per-unit-input"
            type="number"
            step="0.01"
            name="euroPricePerUnit"
            value={newPart.euroPricePerUnit}
            onChange={handleInputChange}
            placeholder="Euro Price Per Unit"
            className="input-field"
          />
          <input
            id="weight-per-unit-kg-input"
            type="number"
            step="0.01"
            name="weightPerUnitKg"
            value={newPart.weightPerUnitKg}
            onChange={handleInputChange}
            placeholder="Weight Per Unit (kg)"
            className="input-field"
          />
          <button id="add-part-button" onClick={handleAddPart} className="button">Add Part</button>
        </div>

        <div id="remove-part-card" className="card">
          <h2>Remove Part</h2>
          <select
            id="remove-part-number-input"
            value={partNumberToRemove}
            onChange={(e) => setPartNumberToRemove(e.target.value)}
            className="input-field"
          >
            <option value="">Select Part Number</option>
            {partNumbers.map((partNumber, index) => (
              <option key={index} value={partNumber}>{partNumber}</option>
            ))}
          </select>
          <button id="remove-part-button" onClick={handleRemovePart} className="button">Remove Part</button>
        </div>

        <ToastContainer />
      </div>
      <br />
      <div id='buttonDiv'>
        <button onClick={handleBack} id="backButton">Return to Dashboard</button>
      </div>
    </div>
  );
};

export default AddRemovePart;
