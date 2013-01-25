// node modules
var path = require('path');
var http = require('http');

// 3rd party modules
// get command line arguments
var argv = require('optimist').argv;
var port = argv.port || 3000;
var stylus = require('stylus');
var nib = require('nib');

// get base directory path
var basedir = path.join(__dirname, '..');

// create web server
var express = require('express');
var app = express();
app.configure(function() {
	app.set('view engine','jade');
	app.set('views', path.join(basedir, '/template/jade'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	// stylus setting
	app.use(stylus.middleware({
		src: path.join(basedir, '/template/stylus'),
		dest: path.join(basedir, '/public'),
		compress: true,
		debug: true,
		compile: function(str, path) {
			return stylus(str)
				.include(nib.path)
				.set('filename', path)
			    .set('compress', true)
		}
	}));
	app.use(express['static'](path.join(basedir, '/public')));
});

// routing
app.get('/', function(req, res) {
	res.render('user');
});

app.get('/master', function(req, res){
	res.render('master');
});

app.get('/master/:id', function(req, res){
	res.render('master/user.jade', {
		id: req.param('id')
	});
});

// api
app.get('/api/user/:id?', function(req, res) {
	var id = req.param('id');
	res.json(id ? (user[id] || {}) : user);
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
			name: data.name,
			message: ''
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
	
	// leave user
	socket.on('leave', function(data) {
		delete user[socket.id];
		socket.broadcast.emit('leave', socket.id);
	});
	
});


