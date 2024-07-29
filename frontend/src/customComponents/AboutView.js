import React from "react";

class AboutView extends React.Component {
  render() {
    return (
      <div className="about-view container">
        <h2 className="text-center">About MercView</h2>
        <p>
          MercView is an inventory management system tailored for the Mercedes
          retailer in Skopje, Macedonia. Our platform addresses critical
          challenges in inventory data management, enhancing efficiency and
          accuracy in supply chain processes.
        </p>
        <p>
          With real-time tracking and detailed reporting, MercView empowers this
          retailer to make data-driven decisions and streamline operations.
        </p>
        <p className="text-muted text-center">
          &copy; 2024 MercView. All rights reserved.
        </p>
      </div>
    );
  }
}

export default AboutView;
