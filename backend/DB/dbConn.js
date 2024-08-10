const mysql = require("mysql2");
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

let dataPool = {};

dataPool.allUsers = () => {
    return new Promise((resolve, reject) =>{
      conn.query(`SELECT * FROM Users`, (err, res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
  };

dataPool.allParts = () => {
    return new Promise((resolve, reject) =>{
        conn.query(`SELECT * FROM Car_Parts`, (err, res)=>{
            if(err){return reject(err)}
            return resolve(res)
            })
        })
    };

dataPool.allModels = () => {
    return new Promise((resolve, reject) =>{
      conn.query(`SELECT * FROM Car_Model`, (err, res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
  };

dataPool.onePart=(part_number) => {
    return new Promise ((resolve, reject)=>{
      conn.query(`SELECT * FROM Car_Parts WHERE part_number = ?`, part_number, (err, res)=>{
        if(err){return reject(err)}
        return resolve(res)
      });
    });
  };

dataPool.oneModel=(car_model_id) => {
    return new Promise ((resolve, reject)=>{
      conn.query(`SELECT * FROM Car_Model WHERE car_model_id = ?`, car_model_id, (err, res)=>{
        if(err){return reject(err)}
        return resolve(res)
      });
    });
  };
      
  dataPool.insertPart = (part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Car_Parts (part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg];
  
      conn.query(query, values, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve({
          part_number: results.insertId,
          part_description,
          quantity,
          country_of_origin,
          euro_price_per_unit,
          weight_per_unit_kg
        });
      });
    });
  };

  // Check if a car model already exists
dataPool.checkCarModelExists = (car_model_name) => {
  return new Promise((resolve, reject) => {
      const query = `
          SELECT * FROM Car_Model
          WHERE car_model_name = ?
      `;
      const values = [car_model_name];

      conn.query(query, values, (err, results) => {
          if (err) {
              console.error("Error checking car model existence:", err);
              return reject(err);
          }
          // If there are results, the car model exists
          resolve(results.length > 0);
      });
  });
};

  dataPool.insertCarModel = (car_model_name) => {
    return new Promise((resolve, reject) => {
      // First, check if the car model already exists
      const checkQuery = `
        SELECT car_model_id FROM Car_Model
        WHERE car_model_name = ?
      `;
      conn.query(checkQuery, [car_model_name], (checkErr, checkResults) => {
        if (checkErr) {
          console.error("Error checking car model existence:", checkErr);
          return reject(checkErr);
        }
  
        if (checkResults.length > 0) {
          // If model exists, return a message indicating so
          return resolve({
            message: 'Car model already exists',
            car_model_id: checkResults[0].car_model_id,
            car_model_name
          });
        }
  
        // Otherwise, insert the new car model
        const insertQuery = `
          INSERT INTO Car_Model (car_model_name)
          VALUES (?)
        `;
        conn.query(insertQuery, [car_model_name], (insertErr, insertResults) => {
          if (insertErr) {
            console.error("Error inserting car model:", insertErr);
            return reject(insertErr);
          }
          resolve({
            car_model_id: insertResults.insertId,
            car_model_name
          });
        });
      });
    });
  };
  
  
  
dataPool.deletePart = (part_number) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM Car_Parts
            WHERE part_number = ?`;
        const values = [part_number];

        conn.query(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

dataPool.deleteCarModel = (car_model_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM Car_Model
      WHERE car_model_id = ?
    `;
    const values = [car_model_id];

    conn.query(query, values, (err, results) => {
      if (err) {
        console.error("Error deleting car model:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

dataPool.editPart = (part_number, part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg) => {
  return new Promise((resolve, reject) => {
      const query = `
                UPDATE Car_Parts
                SET part_description = ?, quantity = ?, country_of_origin = ?, euro_price_per_unit = ?, weight_per_unit_kg = ?
                WHERE part_number = ?`;
      const values = [part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg, part_number];
    
      conn.query(query, values, (err, results) => {
          if (err) {
              return reject(err);
          }
        return resolve(results);
      });
  });
};

dataPool.getPartCompatibility = (part_number) => {
  return new Promise((resolve, reject) => {
      const query = `
          SELECT cm.car_model_name
          FROM MP_Compatibility mc
          JOIN Car_Model cm ON mc.car_model_id = cm.car_model_id
          WHERE mc.part_number = ?;
      `;
      conn.query(query, [part_number], (err, results) => {
          if (err) {
              return reject(err);
          }
          return resolve(results);
      });
  });
};

dataPool.AuthUser=(username) => {
    return new Promise ((resolve, reject)=>{
       conn.query('SELECT * FROM Users WHERE username = ?', username, (err,res, fields)=>{
          if(err){return reject(err)};
          return resolve(res);
      });
    });
  };

  dataPool.getUserById = (employee_id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Users WHERE employee_id = ?';
      const values = [employee_id];
  
      conn.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  };
  dataPool.addUser = (role_id, first_name, last_name, username, password) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Users (role_id, first_name, last_name, username, password)
            VALUES (?, ?, ?, ?, ?)`;
        const values = [role_id, first_name, last_name, username, password];

        conn.query(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                employee_id: results.insertId,
                role_id,
                first_name,
                last_name,
                username
            });
        });
    });
};



dataPool.removeUser = (employee_id) => {
  return new Promise((resolve, reject) => {
      const query = `
          DELETE FROM Users
          WHERE employee_id = ?`;
      const values = [employee_id];

      conn.query(query, values, (err, results) => {
          if (err) {
              return reject(err);
          }
          return resolve(results);
      });
  });
};

dataPool.editUser = (username, password, first_name, last_name, employee_id) => {
  return new Promise((resolve, reject) => {
    let query = 'UPDATE Users SET username = ?, first_name = ?, last_name = ?';
    let values = [username, first_name, last_name];

    if (password) {
      query += ', password = ?';
      values.push(password);
    }

    query += ' WHERE employee_id = ?';
    values.push(employee_id);

    console.log('Executing SQL Query:', query);
    console.log('With Values:', values);

    conn.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

dataPool.logPartHistory = (partDetails, actionType) => {
  return new Promise((resolve, reject) => {
    const {
      part_number,
      old_part_description,
      old_quantity,
      old_country_of_origin,
      old_euro_price_per_unit,
      old_weight_per_unit_kg,
      new_part_description,
      new_quantity,
      new_country_of_origin,
      new_euro_price_per_unit,
      new_weight_per_unit_kg
    } = partDetails;

    let query = `
      INSERT INTO PartHistory (
        part_number, 
        old_part_description, 
        old_quantity, 
        old_country_of_origin, 
        old_euro_price_per_unit, 
        old_weight_per_unit_kg,
        new_part_description, 
        new_quantity, 
        new_country_of_origin, 
        new_euro_price_per_unit, 
        new_weight_per_unit_kg,
        changed_at,
        action_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    let values = [
      part_number,
      old_part_description || null,
      old_quantity || null,
      old_country_of_origin || null,
      old_euro_price_per_unit || null,
      old_weight_per_unit_kg || null,
      new_part_description || null,
      new_quantity || null,
      new_country_of_origin || null,
      new_euro_price_per_unit || null,
      new_weight_per_unit_kg || null,
      new Date(), // current timestamp
      actionType || null
    ];

    console.log('Executing SQL Query:', query);
    console.log('With Values:', values);

    conn.query(query, values, (err, results) => {
      if (err) {
        console.error('Error logging part history:', err);
        return reject(err);
      }
      return resolve(results);
    });
  });
};


dataPool.getPartHistory = (part_number) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM PartHistory
      WHERE part_number = ?
      ORDER BY changed_at DESC
    `;
    conn.query(query, [part_number], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

        
conn.connect((err) => {
    if(err){
        console.log("Error connecting to database: " + err + "\n" + err.message);
        return;
    }
    console.log("Connected to database");
});

module.exports = dataPool;