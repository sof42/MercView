import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../customStyles/AddRemoveCarModel.css';

const AddRemoveCarModel = ({ handleBack }) => {
  const [modelName, setModelName] = useState('');
  const [removeModelId, setRemoveModelId] = useState('');
  const [carModels, setCarModels] = useState([]);

  const fetchCarModels = async () => {
    try {
      const response = await axios.get(`${API_URL}/models`);
      setCarModels(response.data); // Assume the response contains a list of car models
    } catch (err) {
      toast.error('Failed to fetch car models.');
    }
  };

  const handleAddModel = async () => {
    try {
      const response = await axios.post(`${API_URL}/models/insert`, { car_model_name: modelName });
      toast.success(response.data.message);
      setModelName('');
      fetchCarModels(); // Refresh the car models list after adding a new model
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error(err.response.data.message || 'Car model already exists.');
      } else {
        toast.error(err.response.data.error || 'Failed to add model.');
      }
    }
  };

  const handleRemoveModel = async () => {
    try {
      const response = await axios.delete(`${API_URL}/models/remove/${removeModelId}`);
      toast.success(response.data.message);
      setRemoveModelId('');
      fetchCarModels(); // Refresh the car models list after removing a model
    } catch (err) {
      toast.error(err.response.data.error || 'Failed to remove model.');
    }
  };

  useEffect(() => {
    fetchCarModels();
  }, []);

  return (
    <div className="add-remove-model-container">
      <h2>Add or Remove Car Model</h2>

      <div className="card-container1">
        <div className="card1 add-card">
          <h3>Add Car Model</h3>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="Enter car model name"
          />
          <button onClick={handleAddModel} className="button" id='add'>Add Model</button>
        </div>

        <div className="card1 remove-card">
          <h3>Remove Car Model</h3>
          <select
            value={removeModelId}
            onChange={(e) => setRemoveModelId(e.target.value)}
            className="input-field"
          >
            <option value="">Select Car Model</option>
            {carModels.map((model) => (
              <option key={model.car_model_id} value={model.car_model_id}>
                {model.car_model_name}
              </option>
            ))}
          </select>
          <button onClick={handleRemoveModel} className="button" id='remove'>Remove Model</button>
        </div>
      </div>

      <div id='buttonDiv'>
        <button onClick={handleBack} className="button" id='back'>Back to Dashboard</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddRemoveCarModel;
