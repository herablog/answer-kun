(function() {
	
var config = {
	ws: '/'
};

// get user id
var id = $('#contents').data('id');

// initial socket io
var socket = io.connect(config.ws);

// connect
socket.on('connect', function(data){

});

// disconnect
socket.on('disconnect', function(data) {
  console.log('disconnect')
});

// get user data
socket.on('data', function(data) {
	append(data[id]);
});

// onload
$.win.on('load', function() {
	$.http.get('/api/user/' + id).on({
		complete: function(data) {
			append(data);
		}
	});
});

function append(data) {
	$('#message').text(data.message);
	$('#name').text(data.name);
}
	
})();