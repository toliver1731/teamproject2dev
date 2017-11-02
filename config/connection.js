var mysql = require("mysql"); 

if (process.env.JAWS_URL){
  connection = mysql.createConnection(process.env.JAWS_URL);
}else{
  connection= mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "19ZoSo99",
    database: "burgers_db"
  });
}
connection.connect();
// Export connection for our ORM to use.
module.exports = connection;