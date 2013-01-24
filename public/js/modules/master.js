(function() {
	
var config = {
	ws: '/'
};
// initial socket io
var socket = io.connect(config.ws);

// connect
socket.on('connect', function(c){
	
});

// disconnect
socket.on('disconnect', function(data) {
  console.log('disconnect')
});

// get user data
socket.on('user', function(data) {	
	var selector = 'li[data-id="' + data.id + '"]';
	var target = $('#list').find(selector);
	if (target.length()) {
		target.empty();
		target
			.data({ name: data.name, id: data.id })
			.tag('p.name').text(data.name).gat()
			.tag('p.message').text(data.message).gat();
	} else {
		$('#list').append(
			$.tag('li')
				.data({ name: data.name, id: data.id })
				.text(data.name + data.message)
				.tap(
					function() {
						location.replace('/master/' + data.id)
					}
				)
				.tag('p.name').text(data.name).gat()
				.tag('p.message').text(data.message).gat()
		);
	}
});

// onload
$.win.on('load', function() {
	$.http.get('/api/user/').on({
		complete: function(data) {
			append(data);
		}
	});
});

function append(data) {
	var target = $('#list');
	var fragment = $.fragment();
	for (var key in data) {
		fragment.append(
			$.tag('li')
				.data({ name: data[key].name, id: data[key].id })
				.tap(
					function() {
						location.replace('/master/' + data[key].id)
					}
				)
				.tag('p.name').text(data[key].name).gat()
				.tag('p.message').text(data[key].message).gat()
		);
	}
	target.append(fragment);
}
	
})();