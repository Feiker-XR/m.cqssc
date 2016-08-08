(function($, window, designWidth){
	$(window).on('ready resize',function(){
		$('.Q-page').css('zoom',window.innerWidth / designWidth);

		$('.Q-box').css({
			'width' : window.innerWidth + 'px',
			'height' : window.innerHeight+'px',
			'visibility' : 'visible'
		});
		
	});

})(Zepto, window, 640);