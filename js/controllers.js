Number.prototype.toFixed = function (len) {
    var str = this + "";
    var start = str.indexOf(".");
    if (start > -1) return +str.substr(0, start + 3);
    return this;
}


var con = angular.module('starter.controllers', ['ionic'])
    .controller('PickCtrl', ['$rootScope', '$scope', '$state', 'Tip', '$filter', '$ionicScrollDelegate', '$timeout', '$ionicPopup', '$resource', '$ionicSlideBoxDelegate', '$sce', function ($rootScope, $scope, $state, Tip, $filter, $ionicScrollDelegate, $timeout, $ionicPopup, $resource, $ionicSlideBoxDelegate, $sce) {
        $('.loadding').hide();
        var defConfig = {
            moneyUnit: 1,
            //元角模式对应的中文
            moneyUnitData: {'0.1': '角', '1': '元'},
            //单注价格
            onePrice: 2,
            //倍数
            multiple: 1,
            //倍数最大限制
            multipleLimit: 88,
            continuesBet: 1,
            //奖金返点模式切换
            awardMode: 1
        };

        var game = gameFactory();
        var ballBucket = [];
        var ballBucketIdentify = [];
        var globelMultipleData = defConfig;
        var danshiCache = {};
        var serverGameConfig = configData;

        $scope.moreRecordUrl = $sce.trustAsResourceUrl(moreRecordUrl);
        $scope.backToPcUrl = $sce.trustAsResourceUrl(backToPcUrl);

        $rootScope.currentGame = new initPick($rootScope, $scope, $state, Tip, $filter, $ionicScrollDelegate, $timeout, $ionicPopup, $resource, $ionicSlideBoxDelegate, angular, ballBucket, ballBucketIdentify, game, gameFactory, globelMultipleData, danshiCache, serverGameConfig, defConfig, saveBetAwardUrl);
        $rootScope.currentGame.init();

    }])
    .controller('DrawingCtrl', ['$rootScope', '$scope', '$state', '$ionicPopup', '$ionicScrollDelegate', '$filter', 'Tip', '$timeout', function ($rootScope, $scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, Tip, $timeout) {
        
        resultTodo.extend($rootScope.currentGame.getShareOptions());
        var instance = new resultTodo($rootScope, $scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, Tip, $timeout);
        instance.init();
    }])
    .controller('submitCtrl', ['$window', '$rootScope', '$scope', '$state', '$ionicPopup', 'Slot', 'Countup', 'Winning', 'Tip', '$resource', '$timeout', '$filter', '$q', '$ionicScrollDelegate', '$stateParams', function ($window, $rootScope, $scope, $state, $ionicPopup, Slot, Countup, Winning, Tip, $resource, $timeout, $filter, $q, $ionicScrollDelegate, $stateParams) {
        submitTodo.extend($rootScope.currentGame.getShareOptions());
        var instance = new submitTodo($window, $rootScope, $scope, $state, $ionicPopup, Slot, Countup, Winning, Tip, $resource, $timeout, $filter, $q, $ionicScrollDelegate, $stateParams);
        instance.init();

    }])
    .controller('allCtrl', ['$rootScope', '$scope', '$state', 'Tip', '$filter', '$ionicScrollDelegate', '$timeout', '$ionicPopup', '$resource', '$ionicSlideBoxDelegate', function ($rootScope, $scope, $state, Tip, $filter, $ionicScrollDelegate, $timeout, $ionicPopup, $resource, $ionicSlideBoxDelegate) {

        if ($.localStorage('volumeSwich')) {
            $rootScope.volume = $.localStorage('volumeSwich');
        }

        $rootScope.volumeSwich = function () {
            $rootScope.volume = !$rootScope.volume;
            $.localStorage('volumeSwich', $rootScope.volume);
        };

        $scope.menuShowHander = function ($event) {
            $('.ar-popmenu').toggleClass('menuShow');
            $event.stopPropagation();
        };

        $scope.allClick = function () {
            $('.ar-popmenu').addClass('menuShow');
        };

        $rootScope.showRecord10 = function () {
            $rootScope.historyShow = !$rootScope.historyShow;
            $rootScope.historyRecord = $rootScope.serverGameConfig.records.slice(0, 10);
        };
        $rootScope.showRecord = function () {
            location.href = '/showrecord/detail'
        };
    }]);

con.controller('IntroCtrl', ['$rootScope', '$scope', '$state', '$sce', function ($rootScope, $scope, $state, $sce) {
    $scope.introUrl = $sce.trustAsResourceUrl(introUrl);
    $scope.goPick = function (){
        $state.go('pick');
    };
}]);

con.filter('filterArray', function () {
    return function (input, type, obj) {
        var getNormalMethodName = function (type) {
            return type.replace(/\.|_2000/g, '');
        }
        var g = gameFactory()[getNormalMethodName(type)];
        g.prototype.checkBallArray = input;
        var result = g.prototype.getData().result;
        var rebuidArray = result.join('|').replace(/\,/g, '').split('|');
        var rebuildLabel = {
            "sixing\\w+?fushi": function (rebuidArray) {
                rebuidArray.unshift('-');
            },
            "qiansan\\w+?fushi": function () {
                rebuidArray.push('-');
                rebuidArray.push('-');
            },
            "zhongsan\\w+?fushi": function () {
                rebuidArray.push('-');
                rebuidArray.unshift('-');
            },
            "housan\\w+?fushi": function () {
                rebuidArray.unshift('-');
                rebuidArray.unshift('-');
            },
            "qianer\\w+?fushi": function () {
                rebuidArray.push('-');
                rebuidArray.push('-');
                rebuidArray.push('-');
            },
            "houer\\w+?fushi": function () {
                rebuidArray.unshift('-');
                rebuidArray.unshift('-');
                rebuidArray.unshift('-');
            },
            "yixing\\w+?fushi": function () {
                rebuidArray.some(function (v, k, arr) {
                    if (!arr[k].length) arr[k] = '-';
                });
            }
        }
        var objleng = 0;
        for (var key in obj.checkBallArray) objleng++;

        var isSingleLine = objleng == 1;

        for (var key in rebuildLabel) {
            var reg = new RegExp(key);
            if (reg.test(getNormalMethodName(type))) rebuildLabel[key](rebuidArray);
        }

        if (isSingleLine) {
            obj.ballLabel = result.join(',');
        } else {
            obj.ballLabel = rebuidArray.join(',');
        }


        obj.refer = obj.type + "=>" + obj.ballLabel;
        return obj.ballLabel;
    };
});
con.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        var tmp = input.split(splitChar);
        if (splitIndex == 'latest') {
            splitIndex = tmp.length - 1;
        }

        return tmp[splitIndex];
    }
});



