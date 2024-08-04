import React from "react";
import "../customStyles/homeView.css";

class homeView extends React.Component {
  render() {
    return (
      <div className="home-view">
        <video autoPlay muted loop className="background-video">
          <source src="/assets/merc1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content-overlay">
          <div className="container">
            <div className="card border-dark mb-3">
              <div className="card-header bg-dark text-white">
                <h4 className="card-title">Welcome to MercView!</h4>
              </div>
              <div className="card-body">
                <h5 className="card-subtitle mb-2 text-muted">
                  Inventory Management Solution
                </h5>
                <p className="card-text">
                  MercView provides a comprehensive solution for managing your
                  inventory with ease. From tracking stock levels to generating
                  detailed reports, we’ve got you covered.
                </p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    ✔ Real-time Inventory Tracking
                  </li>
                  <li className="list-group-item">
                    ✔ Detailed Reporting and Analytics
                  </li>
                  <li className="list-group-item">
                    ✔ Easy Integration with Other Systems
                  </li>
                </ul>
              </div>
              <div className="card-footer text-muted">
                &copy; 2024 MercView. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default homeView;
