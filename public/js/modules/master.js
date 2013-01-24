(function() {
	
var config = {
	ws: '/'
};
// initial socket io
var socket = io.connect(config.ws);

// connect
socket.on('connect', function(c){
	console.log('connect', c)
	// socket.emit('changePage', parseInt(self.state.params[0]) - 1);

});

// disconnect
socket.on('disconnect', function(data) {
  console.log('disconnect')
});

// get user data
socket.on('user', function(data){
	var target = $('#list').find('.' + data.id);
	if (target.length()) {
		target.data('name', data.name).text(data.name + data.message)
	} else {
		$('#list').append(
			$.tag('li').cls(data.id).data('name', data.name).text(data.name + data.message).tap(
				function() {
					location.replace('/master/' + data.id)
				}
			)
		);
	}
});

socket.on('data', function(data){
	var target = $('#contents').find('#user');
	if (target.length()) {
		
	}
});
	
})();