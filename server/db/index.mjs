import mysql from 'mysql';

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'xcloud',
});

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB.");
});

export default dbConnection;
