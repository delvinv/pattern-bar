var paper;							// Initialise the Raphael canvas
var cwidth = 500, cheight = 500;	// Width and Height of Raphael canvas

$(document).ready(function () {
	// Set the raphael canvas
	paper = new Raphael(document.getElementById('raphaelviz'), cwidth, cheight);
	paper.canvas.style.backgroundColor = '#444';

	var d = "M10 30L60 30L10 80L60 80z";
	var e = "M100,40l50,0l-50,50l50,0z";
	var mark = paper.path(d);
	var mark2 = paper.path(e);
	mark.attr({
    	"stroke": "#F00",
    	"stroke-width": 3
	});
	mark2.attr({
    	"fill": "#F00",
    	"stroke-width": 3
	});
	selectTextarea();
});

// Select the contents of the text area when clicked
function selectTextarea() {
	$('.exporter').on('click focus','#exportcode',function(e) {
		this.focus();
		this.select();
	});
}