
//Required npm packages
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');


//Call out port to use with Express
var PORT = process.env.PORT || 3000;

//app for express
var app = express();
//Public folder to use assets
app.use(express.static(__dirname + '/public'));

//body-parser
app.use(bodyParser.urlencoded({
	extended: false
}))

//Method Override
app.use(methodOverride('_method'));
//handlebars
app.engine('handlebars,',exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//start server
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT)
});