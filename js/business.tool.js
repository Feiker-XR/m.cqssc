var businesstool = new Class({
    initialize: function ($rootScope, $scope, $state, Tip, $filter, $ionicScrollDelegate, $timeout, $ionicPopup, $resource, $ionicSlideBoxDelegate, angular, ballBucket, ballBucketIdentify, game, gameFactory, globelMultipleData, danshiCache,serverGameConfig) {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$state = $state;
        this.Tip = Tip;
        this.$filter = $filter;
        this.$ionicScrollDelegate = $ionicScrollDelegate;
        this.$timeout = $timeout;
        this.$ionicPopup = $ionicPopup;
        this.$resource = $resource;
        this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        this.angular = angular;
        this.ballBucket = ballBucket;
        this.ballBucketIdentify = ballBucketIdentify;
        this.game = game;
        this.gameFactory = gameFactory;
        this.globelMultipleData = globelMultipleData;
        this.danshiCache = danshiCache;
        this.serverGameConfig = serverGameConfig;
    },
    hanlder: function (v, k, arr) {
        arr[k] = false;
    },
    getShopCar: function () {
        return {
            count: 0,
            moneyUnit: this.$rootScope.moneyUnit,
            awardMode: this.$rootScope.awardMode,
            onePrice: this.$rootScope.onePrice,
            multiple: this.$rootScope.multiple,
            total: 0,
            continuesBet: this.$rootScope.globelMultipleData.continuesBet
        };
    },
    getSubmitData: function () {
        var self = this;
        var obj = {
            // "CGISESSID": this.CGISESSID,
            "gameType": 'cqssc', // 彩種
            "isTrace": 0, // 是否追號"0 未追號 1 追號"
            "traceWinStop": 1, //追中即停"0 false 1 ture"
            "traceStopValue": -1, // 盈利停止 -1 未追號 1 false 2 ture
            "balls": [], // 玩法
            "orders": [], // 訂單期號
            "amount": 0, // 總金額
            "isWap": 1    //时候是wap投注
        };
        var arr = this.ballBucket;
        var acount = 0;
        var continuesBet = self.globelMultipleData.continuesBet;

        if (continuesBet > 1) {         //追期
            // 如果连开大于1,则需要设置连开
            obj.isTrace = 1; // 修改追号状态
            if (self.globelMultipleData.traceWinStop != true) {
                obj.traceWinStop = 0;
            }
            obj.traceStopValue = 1; // 盈利模式未开启,故有追号时默认调整为不追号

            // 现版本不支持自定义追号,故连开参数自动选定为自当期开始的N期
            var i, tmpIssueInfo;
            for (i = 0; i< continuesBet; i++) {
                tmpIssueInfo = self.$rootScope.IssueInfo.gamenumbers[i];
                obj.orders.push({
                    number: tmpIssueInfo.number, // Web期號
                    issueCode: tmpIssueInfo.issueCode, // 期號
                    multiple: self.globelMultipleData.multiple// 倍數
                });
            }
        }else {
            // 否则按未连开设置
            obj.orders.push({
                number: self.$rootScope.IssueInfo.number, // 当期的 Web期號
                issueCode: self.$rootScope.IssueInfo.issueCode, // 当期的 期號
                multiple: 1 // 未追号时连开倍數默认为1
            });
        }

        arr.some(function (value, i, items) {
            acount += items[i].total;
            var ballMulti = 1;
            if (continuesBet == 1) {
                ballMulti = items[i].multiple * self.globelMultipleData.multiple;
            }

            obj.balls.push({
                id: i,
                ball: items[i].ballLabel,
                type: items[i].type,
                moneyunit: items[i].moneyUnit,
                multiple: ballMulti,
                awardMode: items[i].awardMode,
                num: items[i].count
            });
        });
        obj.amount = this.totalMoney; // 总金额
        return obj;
    }
    ,
    isNotModity: function (type) {
        return !this.game[this.getNormalMethodName(type)].prototype.isEditor;
    },
    setRS: function (rs, type) {
        rs.label = this.$rootScope.currentMethodTitle;
        rs.type = type;
        var g = this.game[this.getNormalMethodName(type)].prototype;
        var ball = g.checkBallArray;
        rs.checkBallArray = this.angular.extend({}, ball);
        rs.id = g.id;
        rs.maxmultiple = g.maxmultiple;

        this.$filter('filterArray')(rs.checkBallArray, type, rs);
        var item = this.angular.extend({}, rs);
        if (this.removeDuplicateData(item.refer, item)) {
            new this.Tip('该注单已存在!').start();
        } else {
            this.ballBucket.unshift(item);
            this.ballBucketIdentify.unshift(item.refer);
        }

    },
    removeDuplicateData: function (id) {
        return this.ballBucketIdentify.indexOf(id) > -1;
    },
    cleanupBalls: function (type) {
        var methodname = this.getNormalMethodName(type);
        var g = this.game[methodname].prototype = this.gameFactory()[methodname].prototype;
        var arr = this.$rootScope.ballsTree = g.checkBallArray;
        this.$rootScope.hasChoose = false;
        this.resetBalls(arr, type);
    }
    ,
    cleanStyleRecoredandSetCur: function (item) {
        var obj = this.$rootScope.gameMethedsCollection;
        for (var i in obj) obj[i].cur = false;
        item.cur = true;
    },
    cleanStyleRecoredandSetCur: function (item) {
        var obj = this.$rootScope.gameMethedsCollection;
        for (var i in obj) obj[i].cur = false;
        item.cur = true;
    },
    editBalls: function (methodname,item) {
        var type = item.type;
        this.$rootScope.ballsTree = this.game[methodname].prototype.checkBallArray = item.checkBallArray;
        this.$rootScope.editorCurrentBacket = item;
        this.game[methodname].prototype.isEditor = true;
        this.$rootScope.currentEditingItem = item;
        this.$rootScope.iseditor = true;
        this.$rootScope.currentMethodTitle = item.label;
        this.$rootScope.currentMethodName = item.type;
        this.$rootScope.shopCar.multiple = item.multiple;
        this.$rootScope.moneyUnit = this.$rootScope.shopCar.moneyUnit = item.moneyUnit;
        this.$rootScope.awardMode = this.$rootScope.shopCar.awardMode = item.awardMode;
        this.getResult(1, this.getNormalMethodName(item.type));
        this.$state.go('pick');
    }
    ,
    getTotalAll: function () {
        if (this.$rootScope.totalObject) {
            this.$rootScope.totalObject.totalM = 0;
            this.$rootScope.totalObject.totalCount = 0;
            for (var i = 0; i < this.ballBucket.length; i++) {
                var obj = this.ballBucket[i];
                this.$rootScope.totalObject.totalM += (obj.count * obj.onePrice * obj.multiple * obj.moneyUnit);
                this.$rootScope.totalObject.totalCount += (obj.count);
            }
        }
    },
    resetTitleActive: function (i, obj) {
        for (var key in obj) {
            obj[key].active = false;
        }
        obj[i].active = true;
    },
    getDxqdsq: function () {
        return {
            da: {val: '大', cur: false},
            xiao: {val: '小', cur: false},
            quan: {val: '全', cur: false},
            dan: {val: '单', cur: false},
            shuang: {val: '双', cur: false},
            qing: {val: '清', cur: false}
        };
    },
    resetBalls: function (ballsTree, type) {
        var self = this;
        var array = ballsTree instanceof Array ? ballsTree : this.game._.values(ballsTree);
        array.some(function (v, key, arr) {
            if (arr[key].dxqdsq)return;
            if (!/^.+?baodan$/.test(type)) {
                arr[key].dxqdsq = self.getDxqdsq();
            }

        });
    },
    renderBall: function (gameMethod) {
        var key = this.getNormalMethodName(gameMethod.type);
        var ballsTree = this.$rootScope.ballsTree = this.game[key].prototype.checkBallArray;
        this.resetBalls(ballsTree, key);
    },
    changeBallIndexRange: function (item) {
        var ballOneTo26 = /\w+san\.zuxuan\.hezhi/;
        var ballOneTo17 = /\w+er\.zuxuan\.hezhi/;
        if (ballOneTo26.test(item.type) || ballOneTo17.test(item.type)) {
            this.$scope.startPosstion = 1;
        } else {
            this.$scope.startPosstion = 0;
        }
    },
    setCurrentMethodTitle: function (item) {
        this.$rootScope.PrecurrentMethodTitle = this.$rootScope.currentMethodTitle = item.label;
        this.$rootScope.ProcurrentMethodName = this.$rootScope.currentMethodName = item.type;
      

    },
    hasDanshiErrror: function (data) {
        return data.errorData.length > 0 || data.repeatData.length > 0;
    },
    isDanshi: function (item) {
        return /danshi|hunhezuxuan/.test(item.type || item);
    },
    isEmptyballBucket: function () {
        return !this.ballBucket.length;
    },
    cleanupballBucket: function () {
        this.ballBucketIdentify.splice(0, this.ballBucket.length);
        this.ballBucket.splice(0, this.ballBucket.length);
    },
    getNormalMethodName: function (type) {

        return type.replace(/\.|_2000/g, '');
    },
    clearDanshicache: function () {
        var cacheData = {textaraData: '', hasChoose: false, hasDanshiErrror: false, mintotal: 0};
        for (var key in cacheData) {
            this.$rootScope[key] = cacheData[key];
            $('.text-areas').val('');
            $('#tips-danshi').show();
        }
    },
    business: function (item, iii) {
        var Danshi = this.$rootScope.isDanshi = this.$scope.isDanshi = this.isDanshi(item);
        iii && this.$scope.slideHasChanged(iii);
        if (Danshi) {
            this.cleanStyleRecoredandSetCur(item);

            if (this.$rootScope.ProcurrentMethodName != item.type) {
                this.clearDanshicache(this.$rootScope);
            }

            this.setCurrentMethodTitle(item);

        } else {
            this.cleanStyleRecoredandSetCur(item);
            this.changeBallIndexRange(item);
            this.setCurrentMethodTitle(item);
            this.renderBall(item);
            this.getResult(1, this.getNormalMethodName(item.type));
        }
    },
    getResult: function (index, type, val) {
        var data = this.$rootScope.shopCar;
        var key = this.getNormalMethodName(type)
        if (this.isDanshi(type)) {
            var resultData = this.$scope.danshiData = new this.game[this.getNormalMethodName(this.$rootScope.currentMethodName)](val || '');
            var count = data.count = resultData.data.length;
            this.$rootScope.textaraData = val;
            this.$rootScope.hasChoose = count > 0;
            this.$rootScope.hasDanshiErrror = this.hasDanshiErrror(resultData);
            this.$rootScope.mintotal = this.$filter('number')(data.total = count * data.onePrice * data.moneyUnit * data.multiple * this.globelMultipleData.multiple, 1);
            this.danshiCache[key] = {
                mintotal: this.$scope.mintotal,
                hasDanshiErrror: this.$rootScope.hasDanshiErrror,
                hasChoose: this.$rootScope.hasChoose,
                textaraData: this.$rootScope.textaraData
            }
        } else {
            var resultData = this.game[key].prototype.getData();
            var count = data.count = resultData.count;

            this.$rootScope.hasChoose = resultData.result.join().replace(/,/g, '');
            this.$scope.mintotal = this.$filter('number')(data.total = count * data.onePrice * data.moneyUnit * data.multiple * this.globelMultipleData.multiple, 1);
        }
    }

});













