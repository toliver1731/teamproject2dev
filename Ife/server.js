// Packages
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var mysql = require('mysql');

// Server connection
var app = express();
//app.use(bodyParser.urlencoded({
//	extended: false
//});
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultlayout: 'main'}))
app.set('view engine', 'handlebars');

var port = 3000;
app.listen(port);

// MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database:   // !!!!!ADD DATABASE NAME!!!!

connection.connect(function(err){
	if(err) throw err;
	console.log('Connected as id: ' + connection.threadId);
	
})
})

//Express Route that will GET info to the page
app.get('/', function(req, res){
	connection.query('SELECT * FROM items; ', function(err, data){
		res.render('index', {items: data});
		});
});

//POST route
app.post('/create', function(req,res){
	connection.query('INSERT INTO items (item) VALUES (?);', [req.body.item
		], function(err, result){
			if (err) throw err;
			res.redirect('/');
		})
})

// PUT Connection
app.put('/update', function(req, res){
	connection.query('UPDATE items SET item = ? WHERE id = ?;', [req.body.item, 
		req.body.id, req.body.brand, req.body.color], function(err, results){
			if(err) throw err;
			res.redirect('/');
			})
})

// DELETE
app.delete('/delete', function(req, res){
	connection.query("DELETE FROM items WHERE id = ?; ", [req.body.id
	], function(err, results) {
		if(err) throw err;
		res.redirect('/');
	})
})

