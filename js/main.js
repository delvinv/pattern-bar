var draw;							// Initialise the Svg.js canvas
var cwidth = 500, cheight = 500;	// Width and Height of Raphael canvas

$(document).ready(function () {
    // Check for and set the svg.js canvas    
    if (SVG.supported) {
        draw = SVG('raphaelviz').size(cwidth, cheight);
    } else {
        alert('SVG not supported');
    }
    
    //Load controls
    createSlider("#rotate-slider-1", "#rotate-a");
	createSlider("#rotate-slider-2", "#rotate-b");
	createSlider("#rotate-slider-3", "#rotate-c");
    
    renderCanvas();
    
    $('.update-shapes').on('change', function() {
        console.log('Yo'+$(this).val());
        renderCanvas();
    }); 
    
    // When Download button is clicked
    $('#btnDownloadSvg').click(function(e){
        console.log('Download');
    });
    
	selectTextarea();
});

// Refresh Canvas and draw objects
function renderCanvas(){
    
    draw.clear();
    
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

    drawShape(shapeChoice1, 0, shapeRotate1);
    drawShape(shapeChoice2, 1, shapeRotate2);
    drawShape(shapeChoice3, 2, shapeRotate3);

    // Draw required number of objects, allowing for size    
}

// Select the contents of the text area when clicked
function selectTextarea() {
	$('.exporter').on('click focus','#exportcode',function(e) {
		this.focus();
		this.select();
	});
}

// Shape drawing function
function drawShape(shapeNumber, positionNumber, rotationDegrees){
    
    var maxSize = 100;
    var padding = 0;
    switch(positionNumber) {
        case 0: // Outer
            maxSize = 100;
            padding = 0;
            break;
        case 1: // Middle
            maxSize = 75;
            padding = 12.5;
            break;
        case 2: // Innermost
            maxSize = 25;
            padding = 37.5;
            break;
    }
    
    switch(parseInt(shapeNumber)) {
        case 0: // Circle
            var circle = draw.circle(0.5).fill('#fff').stroke({ width: 2 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 1: // Circle
            var circle = draw.circle(maxSize).fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 2: // Oval
            var oval = draw.ellipse(maxSize,maxSize*0.5).fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 3: // Square
            var square = draw.rect(maxSize,maxSize).fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 4: // Triangle
            var triangle = draw.polygon([[0,maxSize], [maxSize,maxSize], [maxSize*0.5,0]]).fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 5: // Rectangle
            var rectangle = draw.rect(maxSize,0.8*maxSize).fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 6: // Pentagon
            var pentagon = draw.polygon([[0,0.5*maxSize], [0.5*maxSize,0], 
                                         [maxSize,0.5*maxSize], [0.75*maxSize,maxSize], 
                                         [0.25*maxSize,maxSize]]).fill('#fff')
            .stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 7: // Hexagon
            var hexagon = draw.polygon([[0,0.5*maxSize], [0.25*maxSize,0], 
                                        [0.75*maxSize,0], [maxSize,0.5*maxSize], 
                                        [0.75*maxSize,maxSize], [0.25*maxSize,maxSize]])
            .fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 8: // Diamonds
            var diamond = draw.circle(maxSize);
            break;
        case 9: // Flower
            var flower = draw.circle(maxSize);
            break;
        case 10: // Starfish
            var starfish = draw.circle(maxSize);
            break;
        case 11: // Star
            var star = draw.polygon([[0,0], [0.5*maxSize,0.25*maxSize], 
                                     [maxSize,0], [0.75*maxSize,0.5*maxSize], 
                                     [maxSize,maxSize], [0.5*maxSize,0.75*maxSize], 
                                     [0,maxSize], [0.25*maxSize,0.5*maxSize]])
            .fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 12: // Plus
            var plus = draw.polygon([[0.4*maxSize,0], [0.6*maxSize,0], [0.6*maxSize,0.4*maxSize], 
                                     [maxSize,0.4*maxSize], [maxSize,0.6*maxSize], [0.6*maxSize,0.6*maxSize], 
                                     [0.6*maxSize,maxSize], [0.4*maxSize,maxSize], [0.4*maxSize,0.6*maxSize], 
                                     [0,0.6*maxSize], [0,0.4*maxSize], [0.4*maxSize,0.4*maxSize]])
            .fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
            break;
        case 13: // Cross
            var cross = draw.circle(maxSize);
            break;
        case 14: // Arrows
            var arrows = draw.circle(maxSize);
            break;
        case 15: // Flag
            var flag = draw.circle(maxSize);
            break;
        case 16: // Heart
            var heart = draw.circle(maxSize);
            break;
    }
}

function createSlider(name, label) {
	$( name ).slider({
      // orientation: "vertical",
      range: "min",
      min: 0,
      max: 360,
      value: 0,
      slide: function( event, ui ) {
      	$( label ).text( $( name ).slider( "value" ) );
        renderCanvas();
      }
    });
}