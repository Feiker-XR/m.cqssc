(function($, window){
	var loginTime = 0;
	$(document).ready(function(){

  		$('.content').eq(1).hide();													//隐藏安全登录模块

  		var item = $('.content').eq(0).find('.item:last-child').remove();			//隐藏普通登录模块验证码栏

  		for(var i = 0; i < $('input').length; i++){									//添加placeholder
  			$('input').eq(i).attr('placeholder',$('input').eq(i).attr('ph'));
  		}

  		$(document).on('click',function(evt){
  			var target = $(evt.target);
  			var clickId = target.attr('clickid');
  			switch(clickId){														//普通登录
  				case 'btn-nml':
  					target.addClass('active').next().removeClass('active');
  					$('.btn-login').text('登录').attr('clickid','btn-login');
  					$('.content').eq(0).show();
  					$('.content').eq(1).hide();
  					break;
  				case 'btn-sec': 													//安全登录
  					target.addClass('active').prev().removeClass('active');
  					$('.content').eq(0).hide();
  					$('#step2').hide();
  					$('.btn-login').text('下一步').attr('clickid','btn-next');
  					$('.content').eq(1).show();
  					break;
  				case 'btn-login':
  					var uname = $.trim($('#ids-n-name').val());
  					var upwd = $.trim($('#ids-n-pwd').val());
  					var ucode = '';
  					//非空检查
  					if(formCheck.isnull(upwd)){
  						$('#ids-tip').text('密码不能为空').show();
  						return false;
  					}
  					//最小长度检查
  					if(formCheck.ltMin(upwd, 6)){
  						$('#ids-tip').text('密码不能少于6位').show();
  						return false;
  					}
  					//特殊字符检查
  					if(!formCheck.isAa_1(upwd)){
  						$('#ids-tip').text('密码不能包含特殊字符').show();
  						return false;
  					}
  					//数据提交
  					loginTime++;
  					if(loginTime >= 3){
  						$('.content').eq(0).find('.list').append(item);
  						$('#ids-n-code').attr('placeholder',$('#ids-n-code').attr('ph'));
  						ucode = $.trim($('#ids-n-code').val());
  					}
  					$.ajax({
  						url           :   '/login/checkLogin',
  						type          :   'POST',
  						async         :   'true',
  						dataType      :   'json',
  						data          :    loginTime <=3 ? {uname : uname, upwd : upwd} : {uname : uname, upwd : upwd, ucode : ucode},
  						beforeSend    :    function(){
  												$('input').attr('disabled','disabled');
  												$(' button').attr('disabled','disabled');
  						},
  						success       :    function(data){
  												if(data['status'] == true){
  													location.href = 'www.baidu.com';
  												}else{
  													$('#ids-tip').text(data['msg']).show();
  												}
  						},
  						complete      :    function(){
  												$('input').removeAttr('disabled');
  												$('button').removeAttr('disabled');
  						},
  						error         :    function(err){
  												console.log(err);
  						}
  					});
  					break;
  			}
  		});
  		$('input').on('focus',function(evt){
  			var target = $(evt.target);
  			target.attr('placeholder','');
  		}).on('blur',function(evt){
  			var target = $(evt.target);
  			target.attr('placeholder',target.attr('ph'));
  			if(target.attr('id') === 'ids-n-name'){								//普通登录检查用户名是否存在
  				var uname = $.trim($('#ids-n-name').val());
  				//非空检查
  				if(formCheck.isnull(uname)){
  					$('#ids-tip').text('用户名不能为空').show();
  					return false;
  				}
  				//长度检查
  				if(formCheck.ltMin(uname,6)){
  					$('#ids-tip').text('用户名长度不能少于6位').show();
  					return false;
  				}
  				//是否是数字字母下划线开头
  				if(!formCheck.isAa_1(uname)){
  					$('#ids-tip').text('用户名只能是数字字母下划线开头').show();
  					return false;
  				}
  				$.ajax({
  					url       		: 	'/login/checkUsername',
  					type      		: 	'POST',
  					dataType  		: 	'json',
  					async			:   'true',
  					data      		: 	{uname : uname},
  					beforeSend		: 	function(){
  											$('input').attr('disabled','disabled');
  											$(' button').attr('disabled','disabled');
  					},
  					success   		:   function(data){
  											if(data['status'] == true){
  												$('#ids-tip').text('').show();
  												$('#ids-icon-exist').css('visibility','visible');
  											}else{
  												$('#ids-icon-exist').css('visibility','hidden');
  												$('#ids-tip').text(data['msg']).show();
  											}
  					},
  					complete        :   function(){
  											$('input').removeAttr('disabled');
  											$('button').removeAttr('disabled');
  					},
  					error           :   function(err){
  											console.log(err);
  					}
  				})
  			}
  		})

	});
})(Zepto,window)
