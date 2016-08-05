(function($, window, designWidth){
	$(window).on('ready resize',function(){
		$('.Q-box').css({
			'width' : window.innerWidth + 'px',
			'height' : window.innerHeight+'px',
			'visibility' : 'visible'
		});
		$('.Q-page').css('zoom',window.innerWidth / designWidth);
	});
})(Zepto, window, 640);