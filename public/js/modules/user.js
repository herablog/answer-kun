(function() {
	
var config = {
	ws: '/'
};
// initial socket io
var socket = io.connect(config.ws);

// connect
socket.on('connect', function(c){
	console.log('connect', c)
});

// disconnect
socket.on('disconnect', function(data) {
	console.log('disconnect')
});

// send user name
$('#name input').on('blur', function() {
	var name = $(this).value();
	if (name) {
		var data = {
			name: name
		};
		socket.emit('addUser', data);
	}
});

// send message
$('#message textarea').on('keyup', function() {
	var message = $(this).value();
	if (message) {
		socket.emit('answer', message);
	}
});
	
})();