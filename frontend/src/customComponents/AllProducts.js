import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../customStyles/AllProduct.css';

const AllProducts = ({ handleBack }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://88.200.63.148:8162/parts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error.message);
      });
  }, []);

  return (
    <div>
      <h2>Product Data 
        <button onClick={handleBack} id='backButton1'>Back to Dashboard</button>
      </h2>
      <br />
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Country of Origin</th>
              <th>Price per Unit (€)</th>
              <th>Weight per Unit (kg)</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.part_number}>
                <td>{product.part_number}</td>
                <td>{product.part_description}</td>
                <td>{product.quantity}</td>
                <td>{product.country_of_origin}</td>
                <td>{product.euro_price_per_unit}</td>
                <td>{product.weight_per_unit_kg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
