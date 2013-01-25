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
			.tag('a').attr({ href: '/master/' + data.id })
				.tag('p.name').text(data.name).gat()
				.tag('p.message').text(data.message).gat()
			.gat();
	} else {
		$('#list').append(
			$.tag('li')
				.data({ name: data.name, id: data.id })
				.tag('a').attr({ href: '/master/' + data.id })
					.tag('p.name').text(data.name).gat()
					.tag('p.message').text(data.message).gat()
				.gat()
		);
	}
});

socket.on('leave', function(id) {
	var selector = 'li[data-id="' + data.id + '"]';
	var target = $('#list').find(selector);
	target && target.remove();
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
				.tag('a').attr({href: '/master/' + data[key].id })
					.tag('p.name').text(data[key].name).gat()
					.tag('p.message').text(data[key].message).gat()
				.gat()
		);
	}
	target.append(fragment);
}
	
})();