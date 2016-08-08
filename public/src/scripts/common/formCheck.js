(function(){

	var formCheck = {
	    isnull: function (txt) {                			//是不是空
	        return txt === '' ? true : false;
	    },
	    len: function (txt) {                  				//返回长度
	        return txt.length;
	    },
	    ltMin: function (txt, minLen) {       				//是不是小于最小长度
	        return this.len(txt) < minLen ? true : false;
	    },
	    gtMax: function (txt, maxLen) {       				//是不是大于最大长度
	        return this.len > maxLen ? true : false;
	    },
	    beginWithNo: function (txt) {        				//是不是数字开头
	        return /^\d/.test(txt) ? true : false;
	    },
	    isAllNo: function (txt) {           				//是否全是数字
	        return /^\d+$/.test(txt) ? true : false;
	    },
	    isAllLowerLetter: function (txt) {     				//是否全是小写字母
	        return /^[a-z]+$/.test(txt) ? true : false;
	    },
	    isAllUperLetter: function (txt) {      				//是否全是大写字母
	        return /^[A-Z]+$/.test(txt) ? true : false;
	    },
	    isAa_1: function (txt) {               				//是否是字母数字和下划线
	        return /^[a-zA-z0-9_]+$/.test(txt) ? true : false;
	    },
	    isEmail: function (txt) {             				//是否是Email
	        return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(txt) ? true : false;
	    },
	    isCellphone: function (txt) {         				//是否是手机
	        return /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(txt) ? true : false;
	    },
	    isTel: function (txt) {               				//是否是座机
	        return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(txt) ? true : false;
	    }
	};

	if (!window.formCheck) {
	    window.formCheck = formCheck;
	} else {
	    throw Error('util已经存在');
	}


})();
