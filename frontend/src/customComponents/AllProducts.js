import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from './utils/config';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import '../customStyles/AllProduct.css';

const AllProducts = ({ handleBack }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/parts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error.message);
      });
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("All Products", 14, 16);

    const tableColumn = ["Part Number", "Description", "Quantity", "Country of Origin", "Price per Unit (€)", "Weight per Unit (kg)"];
    const tableRows = products.map(product => [
      product.part_number,
      product.part_description,
      product.quantity,
      product.country_of_origin,
      product.euro_price_per_unit,
      product.weight_per_unit_kg,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save("products.pdf");
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(products, {
      header: true,
      columns: ["part_number", "part_description", "quantity", "country_of_origin", "euro_price_per_unit", "weight_per_unit_kg"],
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>
        Product Data
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
      <div id='buttonDiv'>
        <button onClick={exportToPDF} id="exportPDFButton">Export to PDF</button>
        <button onClick={exportToCSV} id="exportCSVButton">Export to CSV</button>
      </div>
    </div>
  );
};

export default AllProducts;
