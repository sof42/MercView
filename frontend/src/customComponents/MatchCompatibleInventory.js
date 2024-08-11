import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../customStyles/MatchCompatibleInventory.css';

const MatchCompatibleInventory = ({ handleBack }) => {
  const [parts, setParts] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedPart, setSelectedPart] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [compatibilityList, setCompatibilityList] = useState([]);

  useEffect(() => {
    // Fetch parts
    axios.get(`${API_URL}/parts`)
      .then(response => {
        setParts(response.data);
      })
      .catch(error => console.error("Error fetching parts:", error.message));

    // Fetch car models
    axios.get(`${API_URL}/models`)
      .then(response => {
        setModels(response.data);
      })
      .catch(error => console.error("Error fetching car models:", error.message));
  }, []);

  const handlePartSelection = (event) => {
    setSelectedPart(event.target.value);
  };

  const handleModelSelection = (event) => {
    const { value, checked } = event.target;
    setSelectedModels(prevState =>
      checked ? [...prevState, value] : prevState.filter(model => model !== value)
    );
  };

  const handleAddCompatibility = () => {
    if (selectedPart && selectedModels.length > 0) {
      const newCompatibilities = selectedModels.map(model => ({
        part_number: selectedPart,
        car_model_id: model
      }));
      setCompatibilityList(prevList => {
        return [...prevList, ...newCompatibilities];
      });
      setSelectedModels([]);
      toast.success("Compatibility added successfully!");
    } else {
      toast.error("Please select a part and at least one car model.");
    }
  };

  const handleSubmit = () => {
    // Transform compatibilityList into the required format
    const partsSet = new Set();
    const modelsSet = new Set();

    compatibilityList.forEach(({ part_number, car_model_id }) => {
      partsSet.add(part_number);
      modelsSet.add(car_model_id);
    });

    const requestPayload = {
      parts: Array.from(partsSet),
      models: Array.from(modelsSet)
    };

    axios.post(`${API_URL}/parts/compatibility`, requestPayload)
      .then(response => toast.success("Compatibility mappings saved!"))
      .catch(error => toast.error("Error saving compatibility mappings."));
  };

  return (
    <div className="match-parts-models" id="match-parts-models">
      <div className="back-button-container">
        <button onClick={handleBack} className="btn back-btn" id="back-btn">
          Back to Dashboard
        </button>
      </div>
      <h2 id="page-title">Match Parts with Compatible Car Models</h2>
      <div className="selection-container" id="selection-container">
        <div className="selection-group" id="part-selection-group">
          <h3>Select Part</h3>
          <select onChange={handlePartSelection} value={selectedPart} id="part-select">
            <option value="">Select a part</option>
            {parts.map(part => (
              <option key={part.part_number} value={part.part_number}>
                {part.part_description}
              </option>
            ))}
          </select>
        </div>
        <div className="selection-group" id="model-selection-group">
          <h3>Select Car Models</h3>
          {models.map(model => (
            <div key={model.car_model_id} className="model-option" id={`model-${model.car_model_id}`}>
              <input
                type="checkbox"
                id={`model-checkbox-${model.car_model_id}`}
                value={model.car_model_id}
                onChange={handleModelSelection}
              />
              <label htmlFor={`model-checkbox-${model.car_model_id}`}>{model.car_model_name}</label>
            </div>
          ))}
        </div>
        <button onClick={handleAddCompatibility} className="btn add-compatibility-btn" id="add-compatibility-btn">
          Add Compatible Models
        </button>
        <button onClick={handleSubmit} className="btn submit-btn" id="submit-btn">
        Save Compatibility
      </button>
      </div>
      <div className="compatibility-list" id="compatibility-list">
        <h3>Current Compatibility Mappings</h3>
        <ul>
          {compatibilityList.map((item, index) => (
            <li key={`${item.part_number}-${item.car_model_id}`} id={`compatibility-${index}`}>
              Part: {item.part_number}, Model: {item.car_model_id}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MatchCompatibleInventory;
