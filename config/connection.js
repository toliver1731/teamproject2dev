var mysql = require("mysql");

/*
if (process.env.JAWS_URL){
  connection = mysql.createConnection(process.env.JAWS_URL);
}else{
  connection= mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: ""
  });
}
connection.connect();
// Export connection for our ORM to use.
module.exports = connection;

*/

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user:'root',
  password:'',
  database:'wishlist'
});

connection.connect(function(err){
   if (err) throw err;
   console.log('MYSQL - Connected as id: '+ connection.threadId);
});

module.exports = connection ;
