$(document).ready(function () {
	createSlider("#rotate-slider-a", "#rotate-a");
	createSlider("#rotate-slider-b", "#rotate-b");
	createSlider("#rotate-slider-c", "#rotate-c");
});

function createSlider(name, label) {
	$( name ).slider({
      // orientation: "vertical",
      range: "min",
      min: 0,
      max: 360,
      value: 0,
      slide: function( event, ui ) {
      	$( label ).text( $( name ).slider( "value" ) );
      }
    });
}