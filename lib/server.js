// node modules
var path = require('path');
var http = require('http');

// 3rd party modules
// get command line arguments
var argv = require('optimist').argv;
var port = argv.port || 3000;

// get base directory path
var basedir = path.join(__dirname, '..');

// create web server
var express = require('express');
var app = express();
app.configure(function() {
	app.set('view engine','jade');
	app.set('views', path.join(basedir, '/template/jade'));
	app.use(express['static'](path.join(basedir, '/public')));
});

// routing
app.get('/', function(req, res){
  res.render('user');
});

app.get('/master', function(req, res){
  res.render('master');
});

app.get('/master/:id', function(req, res){
  res.render('master/user.jade');
});

// start server
var server = http.createServer(app).listen(port, function(){
	console.log('server started port on ' + port);
});

// user object
var user = {};

// socket io
var io = require('socket.io').listen(server);

// connect
io.sockets.on('connection', function (socket) {
	// added user
	socket.on('addUser', function(data) {
		
		user[socket.id] = {
			name: data.name
		};
	});
	
	// recieve user answer
	socket.on('answer', function(data) {
		if (user[socket.id]) {
			user[socket.id].message = data;
			user[socket.id].id = socket.id;
			socket.broadcast.emit('user', user[socket.id]);
			socket.broadcast.emit('data', user);
		}
	});
	
});


