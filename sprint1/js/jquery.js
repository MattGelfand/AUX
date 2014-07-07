$(document).ready(function() {
	$.ajax ({
		type:'GET',
		url:'data/contacts.json',
		dataType: 'json',
		success: function(data) {
			console.log(data.addressbook);
		},
		error:function() {
			alert('an ajax error occurred');
		}
	});

	$.getJSON('data/contacts.json', function(data) {
		var addrbook = data.addressBook,
			count = addrbook.length;

			$('#output').empty();

			if(count > 0) {
				.each(addrbook, function(i, obj) {
					$('#ouput').append('<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email + '</a></p>').hide().fadeIn();
				});
			}

			}).error(function() {
				alert('there was an Ajax error');
			}).complete(function() {
				alert('your Ajax call was completed');
			}).success(function() {
				alert('your Ajax call was a success');
		});

	});