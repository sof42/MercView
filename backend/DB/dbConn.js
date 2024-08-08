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

dataPool.onePart=(part_number) => {
    return new Promise ((resolve, reject)=>{
      conn.query(`SELECT * FROM Car_Parts WHERE part_number = ?`, part_number, (err, res)=>{
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



        
conn.connect((err) => {
    if(err){
        console.log("Error connecting to database: " + err + "\n" + err.message);
        return;
    }
    console.log("Connected to database");
});

module.exports = dataPool;