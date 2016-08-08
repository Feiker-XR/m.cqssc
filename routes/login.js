var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var users = require(path.resolve(__dirname,'../data/login','users.json'));

var code = '';
/* 用户名检查 */
router.post('/checkUsername', function(req, res, next) {
	var uname = req.body.uname;
	var result = users.filter(function(item,index){
		return item['uname'] == uname;
	});
	if(result.length > 0){			//用户名存在
		res.send({
			"status":true,
			"msg":"用户名合法"
		});
	}else{							//用户名不存在
		res.send({
			"status":false,
			"msg":"用户名不存在"
		});
	}
});

/* 登录检查 */
router.post('/checkLogin',function(req,res,next){
	var uname = req.body.uname;
	var upwd = req.body.upwd;
	var ucode = req.body.ucode || '';
	var _body = req.body;
	var len = 0;
	for(var p in _body){
		if(_body.hasOwnProperty(p)){
			len++;
		}
	}
	var result = users.filter(function(item,index){
		if(item.uname == uname && item.pwd == upwd){
			return item;
		}
	});
	if(result.length === 0){
		res.send({
			"status":false,
			"msg":"用户名或密码错误"
		});
	}else{
		if(len === 2){
			res.send({
				"status":true,
				"msg":"登录成功"
			});
		}else if(len === 3){
			if(code === ucode){
				res.send({
					"status":true,
					"msg":"登录成功"
				});
			}else{
				res.send({
					"status":false,
					"msg":"验证码不正确"
				});
			}
		}
	}


});

router.get('/changeCode',function(req,res,next){
	var codes = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
	var result = [];
	for(var i = 0;i<4;i++){
		result.push(codes[Math.floor(Math.random()*codes.length)]);
	}
	//console.log(result);
	code = result.join('');
	res.send(result);    
});

module.exports = router;
