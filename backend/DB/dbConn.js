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
    }

    dataPool.oneUser=(employee_id)=>{
        return new Promise ((resolve, reject)=>{
          conn.query(`SELECT * FROM Users WHERE employee_id = ?`, employee_id, (err, res)=>{
            if(err){return reject(err)}
            return resolve(res)
          })
        })
      }
      
      dataPool.insertUser=(employee_id, role_id, first_name, last_name, username, password)=>{
        return new Promise ((resolve, reject)=>{
          conn.query(`INSERT INTO Users (employee_id, role_id, first_name, last_name, username, password) VALUES (?, ?, ?, ?, ?, ?)`, [employee_id, role_id, first_name, last_name, username, password], (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
          })
        })
      }

      dataPool.AuthUser=(username)=>
        {
          return new Promise ((resolve, reject)=>{
            conn.query('SELECT * FROM Users WHERE username = ?', username, (err,res, fields)=>{
                if(err){return reject(err)}
                return resolve(res)
            })
          })
            
        }
        
conn.connect((err) => {
    if(err){
        console.log("Error connecting to database: " + err + "\n" + err.message);
        return;
    }
    console.log("Connected to database");
});

module.exports = dataPool;