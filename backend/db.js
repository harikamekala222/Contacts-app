const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "database-1.cpugimk2mnaz.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "Harikamekala",
  database: "Demo"
});

db.connect((err) => {
  if (err) console.error(err);
  else console.log("Connected to DB");
});

module.exports = db;