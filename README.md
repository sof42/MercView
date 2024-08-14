# MercView

**MercView** is an inventory management system designed specifically for a Mercedes retailer in Skopje, Macedonia. This project addresses inefficiencies in the current inventory management system by providing a more effective and streamlined solution.

**Project is currently being hosted on**: [http://88.200.63.148:8162](http://88.200.63.148:8162)

## Project Overview

MercView aims to resolve key challenges faced with inventory management. MercView is designed to enhance data handling, improve supply chain management, and support data-driven decision-making.

## Features

- **User Roles and Permissions**: Implements role-based access control with distinct roles for inventory managers, sales personnel, and administrators.
- **Inventory Data Management**: Allows users to add, edit, delete inventory items, and manage quantities, with detailed history tracking.
- **Real-time Inventory Tracking**: Provides up-to-date stock information and alerts for low inventory levels.
- **Analytics**: Generates visual reports on inventory and sales trends using charts, graphs, and tables.
- **Compatibility Checker**: Ensures accurate part selection by matching car parts with specific car models.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Styling**: Bootstrap

## Login Credentials

To access the system with different roles, use the following credentials:

- **Inventory Manager**  
  - Username: `manager`  
  - Password: `manager`

- **Sales Personnel**  
  - Username: `sales`  
  - Password: `sales`

- **Administrator**  
  - Username: `admin`  
  - Password: `admin`

## Credits
This project is developed by Sofija Kochovska as part of the Systems III - Information systems course.

## Running the App

The application is currently running with the command:

```bash
forever start index.js
