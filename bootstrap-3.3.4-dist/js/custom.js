$(document).ready(function(){
		$('.thumbnail').hover(
		function(){
		$(this).find('.caption').slideDown(250);
		},
		function(){
		$(this).find('.caption').slideUp(250);
		}
	);
		
    $(".notif").click(function(){
    $(".sembunyi").fadeIn();
	function hidelagi(){
		$(".sembunyi").fadeOut();
	}
	setTimeout(hidelagi,2000);
	});
});