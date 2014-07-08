function getHTTPObject() {
    var xhr;
    if (window.XMLHttpRequest) { //check for support
        //if it's supported, use it because it's better
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { //check for ie 6
        //save it to the xhr variable
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
    }

    return xhr;
}

//define the ajax call
function ajaxCall(dataURL, outputElement, callback) {

    var request = getHTTPObject();
    outputElement.innerHTML = "Loading...";

    request.onreadystatechange = function() {
        setTimeout(function(){
            if(request.readyState === 4 && request.status === 200) {
            var contacts = JSON.parse(request.responseText);
            if (typeof callback === 'function') {
                callback(contacts);
                } // end function check

            } // end ajax status check
        },500);
        } // end onreadystatechange 
        

        request.open('GET', dataURL, true);
        request.send(null);
}




(function() {   


var searchForm = document.getElementById('search-form');
var searchField = document.getElementById('q');
var getAllButton = document.getElementById('get-all');
var target = document.getElementById('output');

var adr = {
    search : function(event) {
        var output = document.getElementById('output');
        ajaxCall('data/contacts.json', output, function (data) {

            adr.hasCompletedLoading = true;

            var searchValue = searchField.value.toLowerCase(),
                addrBook = data.addressBook,
                count = addrBook.length,
                i;

            event.preventDefault();

            target.innerHTML = " ";
            var htmlToWrite = "";
            if(count > 0 && searchValue !== "") {
                htmlToWrite = "";
                for(i = 0; i < count; i = i + 1) {

                    obj = addrBook[i],

                    lowercaseName = obj.name.toLowerCase(),
                    isitFound = lowercaseName.indexOf(searchValue);

                    if(isitFound !== -1) {
                        htmlToWrite += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email +'</a></p>';
                    } // end if
                } // end for loop
            } // end count stack
            target.innerHTML = htmlToWrite;
        }); // end ajax call
    }, 
    getAllContacts : function () {
        var output = document.getElementById('output');
        ajaxCall('data/contacts.json', output, function (data) {
            var addrBook = data.addressBook,
            count = addrBook.length,
            i;
        target.innerHTML = " ";
        if(count > 0) {
            for(i = 0; i < count; i = i + 1) {
                var obj = addrBook[i];
                    target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email +'</a></p>';
                } // end for loop
            } // end count check'
        }); // end ajax call
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
        searchForm.removeAttribute('class');
    },
    hasCompletedLoading : false
} // end adr object

searchField.addEventListener('keyup', adr.search, false);
searchField.addEventListener('focus', adr.setActiveSelection, false);
searchField.addEventListener('blur', adr.removeActiveSelection, false);
getAllButton.addEventListener('click', adr.getAllContacts, false);
searchForm.addEventListener('mouseover', adr.addHoverClass, false);
searchForm.addEventListener('mouseout', adr.removeHoverClass, false);
searchForm.addEventListener('submit', adr.search, false);

})();




