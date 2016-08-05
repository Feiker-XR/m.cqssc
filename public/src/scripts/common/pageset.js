(function($, window, designWidth){
	$('.Q-box').css({
		'width' : window.innerWidth + 'px',
		'height' : window.innerHeight+'px',
		'visibility' : 'visible'
	});
	$('.Q-page').css('zoom',window.innerWidth / designWidth);
})(Zepto, window, 640);