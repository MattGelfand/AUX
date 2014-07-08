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

//check to see if ajax call went through
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
var $target = $("#output");

var adr = {
    search : function(event) {
        var output = document.getElementById('output');
        //start ajax call
        ajaxCall('data/contacts.json', output, function (data) {

            adr.hasCompletedLoading = true;

            var searchValue = searchField.value.toLowerCase(),
                addrBook = data.addressBook,
                count = addrBook.length,
                i;

            event.preventDefault();

            $target.empty();
            var htmlToWrite = "";
            if(count > 0 && searchValue !== "") {
                htmlToWrite = "";
                $.each(addrbook, function(i, obj) {  
                    lowercaseName = obj.name.toLowerCase(),
                    // search through contact list on user keystroke
                    isitFound = lowercaseName.indexOf(searchValue);
                    // if it's not -1, then it's found some results and will output them #output
                    if(isitFound !== -1) {
                        htmlToWrite += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email +'</a></p>';
                    } // end Found if 
                } // end each loop
            } // end count if 
            $target.append(htmlToWrite).hide().fadeIn();
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

//searchField.addEventListener('keyup', adr.search, false);
$('#q').keyup(function(event) {
    adr.search(event);
});
searchField.addEventListener('focus', adr.setActiveSelection, false);
searchField.addEventListener('blur', adr.removeActiveSelection, false);
getAllButton.addEventListener('click', adr.getAllContacts, false);
searchForm.addEventListener('mouseover', adr.addHoverClass, false);
searchForm.addEventListener('mouseout', adr.removeHoverClass, false);
searchForm.addEventListener('submit', adr.search, false);

})();




