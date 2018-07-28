$(function() {
  $('.switcher li').on('click', function() {
  	$('body').removeClass('squares lghtmesh bgnoise white_carbon white_carbonfiber').addClass($(this).attr('class'));  	
  })
});