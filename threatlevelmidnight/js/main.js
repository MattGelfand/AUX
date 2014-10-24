$('.trigger-overlay').click(function() {
	$('.overlay').addClass('overlay-open');
});

$('.trigger-close').click(function() {
	$('.overlay').removeClass('overlay-open');
});



// Picture element HTML5 shiv
document.createElement( "picture" );