var draw;							// Initialise the Svg.js canvas
var cwidth = 500, cheight = 500;	// Width and Height of Raphael canvas

$(document).ready(function () {
	
    // Check for and set the svg.js canvas    
    if (SVG.supported) {
        draw = SVG('raphaelviz').size(cwidth, cheight);
//        var rect = draw.rect(cwidth, cheight).attr({ fill: '#f06' });
    } else {
        alert('SVG not supported');
    }
	
	selectTextarea();
});

// Select the contents of the text area when clicked
function selectTextarea() {
	$('.exporter').on('click focus','#exportcode',function(e) {
		this.focus();
		this.select();
	});
}