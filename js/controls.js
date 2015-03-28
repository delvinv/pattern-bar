$(document).ready(function () {
	createSlider("#rotate-slider-1", "#rotate-a");
	createSlider("#rotate-slider-2", "#rotate-b");
	createSlider("#rotate-slider-3", "#rotate-c");
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