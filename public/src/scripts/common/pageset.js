(function($,window,designWidth){
	$('.F-box').css({'width':window.innerWidth+'px','height':window.innerHeight+'px','visibility':'visible'});
	$('.F-page').css('zoom',window.innerWidth/designWidth);
})(Zepto,window,640);