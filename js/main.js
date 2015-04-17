/*jshint devel:true, browser:true, globals: false, curly: true, noarg: true, undef: true, unused: true, latedef: true, eqnull: true, expr: true, node: true, jquery: true*/
// Used by Brackets editor's JSHint plugin.

var draw;							// Initialise the svg.js canvas
var cwidth = 500, cheight = 500;	// Width and Height of svg.js canvas

// Shape drawing function.
// Using the shape identifier and position within the 3-shape structure, it generates a shape of the right fit.
// Absolute sizes are used here since this is a reference object. When reference image is used, it is scaled and adjusted using transformations.
function drawShape(shapeNumber, positionNumber, rotationDegrees){
    
    var maxSize = 500;              // Assuming width and height of the shape are the same, this is the size of the outer shape.
    var padding = 0;                // Inner shapes are scaled down and hence need a padding from the left/top margins to center them.

    // Based on position of the shape within the 3-shape structure, adjust the offset from the left and the size of the shape.
    switch(positionNumber) {
        case 0:                     // Outermost shape
            maxSize = 500;
            padding = 0;
            break;
        case 1:                     // Middle shape
            maxSize = 375;
            padding = 12.5*5;       // Offset required for the middle shape
            break;
        case 2:                     // Innermost shape
            maxSize = 125;
            padding = 37.5*5;
            break;
    }
    
    // Depending on which shape is chosen by the user, the chosen shape is rotated and offset accordingly.
    switch(parseInt(shapeNumber)) {
        case 0: // None option. This draws a small dot.
            return draw.circle(0.5).fill('#fff').stroke({ width: 2 })
                .move(padding,padding).rotate(rotationDegrees);
        case 1: // Circle
            return draw.defs().circle(maxSize).fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 2: // Oval
            return draw.ellipse(maxSize,maxSize*0.5).fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 3: // Square
            return draw.defs().rect(maxSize,maxSize).fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 4: // Triangle
            return draw.polygon([[0,maxSize], [maxSize,maxSize], [maxSize*0.5,0]]).fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 5: // Rectangle
            return draw.rect(maxSize,0.8*maxSize).fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 6: // Pentagon
            return draw.polygon([[0,0.5*maxSize], [0.5*maxSize,0], 
                                         [maxSize,0.5*maxSize], [0.75*maxSize,maxSize], 
                                         [0.25*maxSize,maxSize]])
                .fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 7: // Hexagon
            return draw.polygon([[0,0.5*maxSize], [0.25*maxSize,0], 
                                        [0.75*maxSize,0], [maxSize,0.5*maxSize], 
                                        [0.75*maxSize,maxSize], [0.25*maxSize,maxSize]])
                .fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 8: // Diamonds
            return draw.circle(maxSize);
        case 9: // Flower
            return draw.circle(maxSize);
        case 10: // Starfish
            return draw.circle(maxSize);
        case 11: // Star
            return draw.defs().polygon([[0,0], [0.5*maxSize,0.25*maxSize], 
                                     [maxSize,0], [0.75*maxSize,0.5*maxSize], 
                                     [maxSize,maxSize], [0.5*maxSize,0.75*maxSize], 
                                     [0,maxSize], [0.25*maxSize,0.5*maxSize]])
            .fill('#fff').stroke({ width: 1 }).move(padding,padding).rotate(rotationDegrees);
        case 12: // Plus shape
            return draw.polygon([[0.4*maxSize,0], [0.6*maxSize,0], [0.6*maxSize,0.4*maxSize], 
                                     [maxSize,0.4*maxSize], [maxSize,0.6*maxSize], [0.6*maxSize,0.6*maxSize], 
                                     [0.6*maxSize,maxSize], [0.4*maxSize,maxSize], [0.4*maxSize,0.6*maxSize], 
                                     [0,0.6*maxSize], [0,0.4*maxSize], [0.4*maxSize,0.4*maxSize]])
                .fill('#fff').stroke({ width: 1 })
                .move(padding,padding).rotate(rotationDegrees);
        case 13: // Cross
            return draw.circle(maxSize);

        case 14: // Arrows
            return draw.circle(maxSize);

        case 15: // Flag
            return draw.circle(maxSize);

        case 16: // Heart
            return draw.circle(maxSize);

    }
}

// Refresh Canvas and draw objects
function renderCanvas(){

    draw.clear();                                                   // Clear the SVG

    // Get index of selected shapes. 1st shape has index 0, next 1 and so on..
    var shapeChoice1 = $('#select-shape-1').val();
    var shapeChoice2 = $('#select-shape-2').val();
    var shapeChoice3 = $('#select-shape-3').val();

    // How much to rotate each shape by. The jQuery slider's values are derived here.
    var shapeRotate1 = $( '#rotate-slider-1' ).slider( "value" );
    var shapeRotate2 = $( '#rotate-slider-2' ).slider( "value" );
    var shapeRotate3 = $( '#rotate-slider-3' ).slider( "value" );

    // Tesselation properties, obtained using the X Repeat and Y Repeat input boxes on the front-end.
    var xRepeat = parseInt($('#x-repeat').val());
    var yRepeat = parseInt($('#y-repeat').val());

    var xScale = 1/xRepeat;                                         // Scaling factor on the x-acis
    var yScale = 1/yRepeat;                                         // Scaling factor on the y-acis

    var shapeFinal1 = drawShape(shapeChoice1, 0, shapeRotate1);     // Create the outer shape
    var shapeFinal2 = drawShape(shapeChoice2, 1, shapeRotate2);     // Create the middle shape
    var shapeFinal3 = drawShape(shapeChoice3, 2, shapeRotate3);     // Create the innermost shape

    var shapeGroup = draw.group();                                  // Creating a group to accumulate the 3 shapes. Makes it easy to apply transformations.
    shapeGroup.add(shapeFinal1);
    shapeGroup.add(shapeFinal2);
    shapeGroup.add(shapeFinal3);

    // If more than one instance of the object is requested by the user, then we scale the group created above.
    if (!((xRepeat == 1) && (yRepeat == 1))){
        shapeGroup.scale(xScale, yScale);
        // Referencing the group created above and moving it within a gridding system.
        for(var i=0; i<xRepeat; i++){
            for(var j=0; j<yRepeat; j++){
                draw.use(shapeGroup).move(i*cwidth/xRepeat, j*cheight/yRepeat);
            }
        }
    }

    // Copy SVG pattern to Export textarea.
    var svgText1 = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="500" height="500">';   // SVG declaration code needed at start of document.
    var svgCode = $('svg').html();                                                                      // Contents of the SVG pattern we created in function so far.
    var svgText3 = '</svg>';                                                                            // Closing tag of SVG syntax.

    svgText4 = "<!--" + " <s1>"+shapeChoice1+"</s1>" + " <s2>"+shapeChoice2+"</s2>" + " <s3>"+shapeChoice3+"</s3>" + " -->";
    svgText4 = svgText4 + "<!--" + " <r1>"+shapeRotate1+"</r1>" + " <r2>"+shapeRotate2+"</r2>" + " <r3>"+shapeRotate3+"</r3>" + " -->";
    svgText4 = svgText4 + "<!--" + " <xR>"+xRepeat+"</xR>" + " <yR>"+yRepeat+"</yR>" + " -->";

    var finalCode = svgText1.concat(svgCode, svgText3, svgText4);                                       // Concatenating the strings to produce full standalone SVG code.

    $('#exportcode').empty().val(finalCode);                                                            // Adding the standalone code to 'Export' textarea, user can copy this

    // Update the SVG file to be downloaded.
    downloadSVG();
}

// Creating the Rotation sliders in the interface for the user to control shape transformation.
function createSlider(name, label) {
	$( name ).slider({
      // orientation: "vertical",
      range: "min",
      min: 0,
      max: 360,
      value: 0,
      slide: function() {
      	$( label ).text( $( name ).slider( "value" ) );
        renderCanvas();
      }
    });
}

// Select the contents of the text area when clicked.
// User only needs to click the textarea and then copy to clipboard.
function selectTextarea() {
	$('.exporter').on('click focus','#exportcode',function() {
		this.focus();
		this.select();
	});
}

// Enable downloading the SVG code as a standalone file when the Download button is clicked.
function downloadSVG(){
    window.URL = window.webkitURL || window.URL;
    var contentType = 'image/svg+xml';
    var svgCode = $('#exportcode').val();
    var svgFile = new Blob([svgCode], {type: contentType});

    $('#aDownloadSvg').prop('download','pattern-bar.svg');
    $('#aDownloadSvg').prop('href',window.URL.createObjectURL(svgFile));
    $('#aDownloadSvg').prop('textContent','Download SVG');
}

function loadClick(){
    $('#aLoadSvg').click(function(e) {
        e.preventDefault();
        loadSVG();
        renderCanvas();
    })
}

// .SVG file contents are pasted in the text box and read in pattern parameters from it
function loadSVG(){
    var svgCode = $('#exportcode').val();

    // Set Shape 1 from the code.
    var shapeChoice1 = svgCode.match(/<s1>(\d*?)<\/s1>/g).map(function(val) {
        return val.replace(/<\/?s1>/g,'');
    });
    if(shapeChoice1) {
        $('#select-shape-1').val(shapeChoice1);
    }

    // Set Shape 2 from the code.
    var shapeChoice2 = svgCode.match(/<s2>(\d*?)<\/s2>/g).map(function(val) {
        return val.replace(/<\/?s2>/g,'');
    });
    if(shapeChoice2) {
        $('#select-shape-2').val(shapeChoice2);
    }

    // Set Shape 3 from the code.
    var shapeChoice3 = svgCode.match(/<s3>(\d*?)<\/s3>/g).map(function(val) {
        return val.replace(/<\/?s3>/g,'');
    });
    if(shapeChoice3) {
        $('#select-shape-3').val(shapeChoice3);
    }

    // Load Slider values from the textarea
    var shapeRotate1 = svgCode.match(/<r1>(\d*?)<\/r1>/g).map(function(val) {
        return val.replace(/<\/?r1>/g,'');
    });
    if(shapeRotate1){
        $("#rotate-slider-1").slider('option','value',shapeRotate1);
        $( "#rotate-a" ).text( shapeRotate1 );
    }
    var shapeRotate2 = svgCode.match(/<r2>(\d*?)<\/r2>/g).map(function(val) {
        return val.replace(/<\/?r2>/g,'');
    });
    if(shapeRotate2){
        $("#rotate-slider-2").slider('option','value',shapeRotate2);
        $( "#rotate-b" ).text( shapeRotate2 );
    }
    var shapeRotate3 = svgCode.match(/<r3>(\d*?)<\/r3>/g).map(function(val) {
        return val.replace(/<\/?r3>/g,'');
    });
    if(shapeRotate3){
        $("#rotate-slider-3").slider('option','value',shapeRotate3);
        $( "#rotate-c" ).text( shapeRotate3 );
    }

    // Load Tesselation properties from the text area
    var xr = svgCode.match(/<xR>(\d*?)<\/xR>/g).map(function(val) {
        return val.replace(/<\/?xR>/g,'');
    });
    if(xr) {
        $('#x-repeat').val(xr);
    }
    var yr = svgCode.match(/<yR>(\d*?)<\/yR>/g).map(function(val) {
        return val.replace(/<\/?yR>/g,'');
    });
    if(yr) {
        $('#y-repeat').val(yr);
    }
}


// Loaded when body of HTML is loaded.
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
    downloadSVG();
    loadClick();

    // When interface controls are changed, then refresh and draw SVG
    $('.update-shapes').on('change', function() {
        renderCanvas();
    });

    // Loading up listener that ensures clicking on text area selects its contents.
	selectTextarea();
});
