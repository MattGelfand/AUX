(function() {	

var contacts = {
"addressbook" : [
		{
		"name": "Richard",
		"email": "richard@freshtilledsoil.com",
		},

		{
		"name": "Kelly",
		"email": "kelly@freshtilledsoil.com",
		},

		{
		"name": "Mark",
		"email": "mark.grambau@freshtilledsoil.com",
		},

		{
		"name": "Mike",
		"email": "michael.connors@freshtilledsoil.com",
		},

		{
		"name": "Sarah",
		"email": "sarah@freshtilledsoil.com",
		}	
	]
};

var searchForm = document.getElementById('search-form');
var searchField = document.getElementById('q');
var getAllButton = document.getElementById('get-all');
var count = contacts.addressbook.length;
var target = document.getElementById('output');


var adr = {
	search : function(event) {
		var searchValue = searchField.value.toLowerCase(),
			i;

		event.preventDefault();

		target.innerHTML = " ";

		if(count > 0 && searchValue !== " ") {
			for(i = 0; i < count; i = i + 1) {
				var obj = contacts.addressbook[i],
				name = obj.name.toLowerCase(),
				isitFound = obj.name.indexOf(searchValue);
				if(isitFound !== -1) {
					target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email +'</a></p>';

				} // end if
			} // end for loop
		} // end count stack
	}, 
	getAllContacts : function () {
		var i;
		target.innerHTML = " ";
		if(count > 0) {
			for(i = 0; i < count; i = i + 1) {
				var obj = contacts.addressbook[i];
					target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email +'</a></p>';
			} // end for loop
		} // end count check
	}, 
	setActiveSelection : function() {
		this.parentNode.setAttribute('class', 'active');
	},
	removeAttribute : function() {
		this.parentNode.removeAttribute('class');
	},
	addHoverClass : function() {
		searchForm.setAttribute('class', 'hovering');
	},
	removeHoverClass : function() {
		searchForm.removeHoverClass('class');
	},
} // end adr object

searchField.addEventListener('keyup', adr.search, false);
searchField.addEventListener('focus', adr.setActiveSelection, false);
searchField.addEventListener('blur', adr.removeActiveSelection, false);
getAllButton.addEventListener('click', adr.getAllContacts, false);
searchForm.addEventListener('mouseover', adr.addHoverClass, false);
searchForm.addEventListener('mouseout', adr.removeHoverClass, false);
searchForm.addEventListener('submit', adr.search, false);

})();

function getHTTPObject() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject('Msxml2.XMLHTTP');
	}

	return xhr;
}

var request = getHTTPObject();
request.open('GET', 'data/contacts.json', true);
request.send(null);




