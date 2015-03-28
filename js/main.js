var draw;							// Initialise the Svg.js canvas
var cwidth = 500, cheight = 500;	// Width and Height of Raphael canvas

$(document).ready(function () {
	
    // Check for and set the svg.js canvas    
    if (SVG.supported) {
        draw = SVG('raphaelviz').size(cwidth, cheight);
    //     var rect = draw.rect(cwidth, cheight).attr({ fill: '#f06' });
    } else {
        alert('SVG not supported');
    }
    
    // When Draw button is clicked
    $('#btnDraw').click(function(e){
        // Get index of selected shapes
        var shapeChoice1 = $('#select-shape-1').val();
        var shapeChoice2 = $('#select-shape-2').val();
        var shapeChoice3 = $('#select-shape-3').val();
        
        // How much to rotate each shape by
        var shapeRotate1 = $( '#rotate-slider-1' ).slider( "value" );
        var shapeRotate2 = $( '#rotate-slider-2' ).slider( "value" );
        var shapeRotate3 = $( '#rotate-slider-3' ).slider( "value" );
        
        // Tesselation properties
        var xRepeat = $('#x-repeat').val();
        var yRepeat = $('#y-repeat').val();
        
        // Draw required number of objects, allowing for size
        for(i=0; i < yRepeat; i++){
            for(j=0; j < xRepeat; j++){
                
            }    
        }
    });
    
    // When Download button is clicked
    $('#btnDownloadSvg').click(function(e){
        console.log('Download');
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

// Shape drawing function
function drawShape(shapeNumber, positionNumber, xPos, yPos){
    switch(shapeNumber) {
        case 0: // Circle
            var circle = draw.circle(100);
            break;
    }
}