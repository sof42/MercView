import React from "react";

class AboutView extends React.Component {
  render() {
    // for inline styles
    const containerStyle = {
      maxWidth: '60em', margin: '0 auto', padding: '20px', overflowY: 'auto', height: '100vh'
    };

    const cardStyle = {
      border: '1px solid #343a40', borderRadius: '0.25rem', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.075)', marginBottom: '20px',
    };

    const cardHeaderStyle = {
      backgroundColor: '#343a40', color: '#ffffff', padding: '15px', borderBottom: '1px solid #343a40',
    };

    const cardBodyStyle = {
      padding: '15px',
    };

    const cardFooterStyle = {
      backgroundColor: '#f8f9fa', padding: '10px', textAlign: 'center',
    };

    const listGroupItemStyle = {
      padding: '10px', borderBottom: '1px solid #dee2e6',
    };

    return (
      <div className="about-view" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <div className="card-header" style={cardHeaderStyle}>
            <h4 className="card-title">Project Overview</h4>
          </div>
          <div className="card-body" style={cardBodyStyle}>
            <p>
              MercView is an advanced inventory management system designed specifically for the Mercedes retailer in Skopje, Macedonia. Our platform addresses critical challenges in inventory data management, enhancing efficiency and accuracy in supply chain processes.
            </p>
            <p>
              The system features a range of functionalities tailored to streamline operations and support data-driven decision-making.
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item" style={listGroupItemStyle}>
                <strong>User Roles and Permissions:</strong> Implements role-based access control to ensure appropriate permissions based on user roles. Defined roles include inventory managers, sales personnel, and administrators, each with varying levels of access and functionality.
              </li>
              <li className="list-group-item" style={listGroupItemStyle}>
                <strong>Inventory Data Management:</strong> Allows users to input, manage, and update inventory data, including vehicle models and parts. Features include adding, editing, and deleting items, as well as maintaining a history of changes with details on date, action type and specifications of the part before updating.
              </li>
              <li className="list-group-item" style={listGroupItemStyle}>
                <strong>Real-time Inventory Tracking:</strong> Provides up-to-date information on stock levels and alerts users when inventory falls below a specified threshold.
              </li>
              <li className="list-group-item" style={listGroupItemStyle}>
                <strong>Analytics:</strong> Generates reports on inventory levels and sales trends with data visualization tools such as bar charts and line graphs to aid in understanding data patterns and making informed decisions.
              </li>
              <li className="list-group-item" style={listGroupItemStyle}>
                <strong>Compatibility Checker:</strong> Determines which car parts are compatible with specific car models, reducing errors and ensuring accurate part selection.
              </li>
            </ul>
          </div>
          <div className="card-footer" style={cardFooterStyle}>
            &copy; 2024 MercView. All rights reserved.
          </div>
        </div>
      </div>
    );
  }
}

export default AboutView;