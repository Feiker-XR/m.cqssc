Number.prototype.toFixed = function (len) {
    var str = this + "";
    var start = str.indexOf(".");
    if (start > -1) return +str.substr(0, start + 3);
    return this;
}


var con = angular.module('starter.controllers', ['ionic'])
    .controller('PickCtrl', ['$rootScope', '$scope', '$state', 'Tip', '$filter', '$ionicScrollDelegate', '$timeout', '$ionicPopup', '$resource', '$ionicSlideBoxDelegate', function ($rootScope, $scope, $state, Tip, $filter, $ionicScrollDelegate, $timeout, $ionicPopup, $resource, $ionicSlideBoxDelegate) {
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
            continuesBet: 1
        };

        var game = gameFactory();
        var ballBucket = [];
        var ballBucketIdentify = [];
        var globelMultipleData = defConfig;
        var danshiCache = {};
        var serverGameConfig = configData;

        $rootScope.currentGame = new initPick($rootScope, $scope, $state, Tip, $filter, $ionicScrollDelegate, $timeout, $ionicPopup, $resource, $ionicSlideBoxDelegate, angular, ballBucket, ballBucketIdentify, game, gameFactory, globelMultipleData, danshiCache, CGISESSID, serverGameConfig, defConfig);
        $rootScope.currentGame.init();

    }])
    .controller('DrawingCtrl', ['$rootScope', '$scope', '$state', '$ionicPopup', '$ionicScrollDelegate', '$filter', 'Tip', '$timeout', function ($rootScope, $scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, Tip, $timeout) {
        console.log($rootScope.currentGame.getShareOptions());
        resultTodo.extend($rootScope.currentGame.getShareOptions());
        var instance = new resultTodo($rootScope, $scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, Tip, $timeout);
        instance.init();
    }])
    .controller('submitCtrl', ['$rootScope', '$scope', '$state', '$ionicPopup', 'Slot', 'Countup', 'Winning', 'Tip', '$resource', '$timeout', '$filter', '$q', '$ionicScrollDelegate', '$stateParams', function ($rootScope, $scope, $state, $ionicPopup, Slot, Countup, Winning, Tip, $resource, $timeout, $filter, $q, $ionicScrollDelegate, $stateParams) {
        
      
        
        $rootScope.submit = $scope.submit = function (thisindex) {

            Slot.noQuickAnimation();
            Winning.noQuickAnimation();
            $scope.isNoshow = false;


            var parameter = getSubmitData(ballBucket, $rootScope, $scope.totalMoney);

            if (parameter.amount > serverGameConfig.balance && !window.debug) {
                var tips = new Tip("您的余额不足");
                tips.start();
                $state.go('drawing');
                return;
            }

            if (!ballBucket.length || $scope.isAjaxRunning) return;

            $rootScope.autoreduceAcount = typeof thisindex !== "undefined" ? thisindex : $rootScope.autoreduceAcount;
            $scope.isAjaxRunning = true;
            $scope.interWine = true;
            var freezing = false;
            var status = $('#status');
            status.text('开奖中');

            barBtn.text('加载中...');
            var dtd = $q.defer();
            backtodw.hide();
            barBtn.removeClass('mybarBtn');

            var defered = $q.defer();

            setTimeout(function () {
                defered.resolve();
            }, 1000);

            $resource(window.debug ? 'submit.php' : postbasePath + 'bet', {}, {
                save: {
                    method: 'POST',
                    timeout: 20000
                }
            }).save(parameter, function (obj) {
                $scope.volumeControll();
                serverGameConfig.balance = obj.balance || serverGameConfig.balance;
                Slot.noQuickAnimation();
                Winning.noQuickAnimation();


                isemptyWinning.show();
                barBtn.text("停止");
                barBtn.removeClass('active');
                backtodw.hide();
                barBtn.removeClass('mybarBtn');

                $scope.isNoshow = false;
                $scope.isAjaxRunning = false;
                $rootScope.autoreduceAcount++;
                $scope.currentIndex = $rootScope.autoreduceAcount;
                $rootScope.volume ? Slot.openMusic() : Slot.stopMusic();


                $scope.winnings = [];
                $scope.allwinend = $scope.allwin;

                var countup = new Countup($('#countUp'), $scope.allwin, $scope.allwinend, 1);
                try {
                    Slot.init(obj.data.result.split(','), $('#slot'));
                } catch (e) {

                    var alertPopup = $ionicPopup.alert({
                        title: '温馨提示',
                        template: '网络异常，请稍后重试'
                    }).then(function (res) {
                        $scope.allwinend = $scope.allwin = 0;
                        globelMultipleData.continuesBet = 1;
                        $state.go('drawing');
                    });
                    console.trace("服务数据返回出错:", obj);
                    return;
                }
                $scope.winArray = game._.filter(obj.data.list, function (value, k, obj) {
                    return value.isWin;
                });
                $scope.backupWinArray = $scope.winArray.concat();

                $rootScope.serverGameConfig.balance = obj.balance;
                $rootScope.serverGameConfig.records = $rootScope.serverGameConfig.records || [];

                $rootScope.serverGameConfig.records.unshift({
                    numberRecord: obj.data.result.split(',').join(''),
                    time: obj.data.writeTime
                });


                $scope.df = $q.defer();
                $scope.df.promise.then(function () {
                    backtodw.show();
                    barBtn.addClass('mybarBtn');
                    dtd.resolve('finish data');
                    freezing = false;
                });
                $scope.dffinishSlotAnimation = $q.defer();
                $scope.dffinishSlotAnimation.promise.then(function (isQuckly) {

                    if (!$scope.winArray.length) {
                        if ($scope.backupWinArray.length) {
                            $scope.df.resolve();
                            return;
                        }

                        status.text("未中奖");
                        $scope.isNoshow = [{}];

                        $scope.qucklyPrint = function () {
                            isemptyWinning.hide();
                            $scope.df.resolve();
                        };
                        timeContainer.push(setTimeout(function () {
                            isemptyWinning.hide();
                            $scope.df.resolve();
                        }, t));


                        $scope.volumeControll();

                    } else {
                        $scope.isNoshow = false;
                        status.text("派奖中");
                        function Havebigwin() {
                            var totalPrice = 0;
                            var mn = 0;
                            for (var i = 0; i < $scope.winArray.length; i++) {
                                var arr = $scope.winArray[i];
                                mn += arr.winMoney;
                                totalPrice = totalPrice + (+arr.totalPrice)
                            }
                            return mn / totalPrice >= 50;
                        };
                        timeContainer.push(setTimeout(printout, t));
                        Winning.start(Havebigwin(), $scope.winArray.length, function () {
                            $scope.df.resolve();
                        });
                        //1.金额叠加效果
                        countup.start();
                        $scope.volumeControll();
                    }
                });
                $scope.dfSlot = $q.defer();
                $scope.dfSlot.promise.then(function () {
                    finishSlotAnimation(true);
                    $scope.df.resolve();
                    status.text('已结束');
                });
                var t = 1000;

                function printout() {
                    isemptyWinning.hide();
                    $scope.$apply(function () {
                        if ($scope.winArray.length) {
                            renderItem();
                            timeContainer.push(setTimeout(printout, t));
                        } else {
                            for (var i = 0; i < timeContainer.length; i++) {
                                clearTimeout(timeContainer.shift());
                            }
                        }

                    });
                }

                $scope.qucklyPrint = function () {
                    while ($scope.winArray.length) {
                        renderItem();
                    }
                }

                function finishSlotAnimation(isQuckly) {
                    $scope.dffinishSlotAnimation.resolve(isQuckly);
                }

                function qucklySlot() {
                    Slot.quickAnimation(function () {
                        $scope.dfSlot.resolve();
                    });
                }

                $scope.volumeControll();
                Slot.start(finishSlotAnimation);

                if (!$scope.barBtnHandler) {
                    $scope.barBtnHandler = function () {
                        if ($scope.isAjaxRunning || freezing) {
                            return;
                        }
                        $scope.$apply(function () {
                            if (barBtn.text() == "停止") {
                                changeContinueStatus();
                                qucklySlot();
                                qucklyWinning();
                                isemptyWinning.hide();
                                //globelMultipleData.continuesBet = 1;
                            } else if (barBtn.text().indexOf('再开') > -1) {
                                barBtn.text('停止');
                                barBtn.removeClass('active');
                                $rootScope.autoreduceAcount = 0;
                                $scope.submit();
                                $scope.allwinend = $scope.allwin = 0;
                            }
                        });

                    }
                    barBtn.on('click', $scope.barBtnHandler);
                }

                if (!$rootScope.backtDraw) {
                    $rootScope.backtDraw = function () {
                        $scope.allwinend = $scope.allwin = 0;
                        changeContinueStatus();
                        qucklySlot();
                        qucklyWinning();
                        $state.go('drawing');

                    };
                }
                function changeContinueStatus() {
                    if (globelMultipleData.continuesBet > 1 && $rootScope.autoreduceAcount < globelMultipleData.continuesBet && $scope.currentIndex != globelMultipleData.continuesBet) {
                        barBtn.text('再开' + globelMultipleData.continuesBet + '期');
                        barBtn.addClass('active');
                    } else {
                        if (globelMultipleData.continuesBet == 1) {
                            barBtn.text('再开' + globelMultipleData.continuesBet + '期');
                            barBtn.addClass('active');
                        }
                    }
                }

                function renderItem() {
                    var arr = $scope.winArray.shift();
                    var mn = arr.winMoney;
                    var money = mn + "元";
                    $scope.allwin += mn;
                    $scope.allwin = +$scope.allwin.toFixed(1);
                    var ruls = arr.modes == '角' ? 0.1 : 1;
                    $scope.winnings.unshift(
                        {
                            numbers: arr.code,
                            type: arr.methodName + arr.num + "注 X " + (ruls * 2) + "元",
                            money: money,
                        }
                    );

                    countup.update($scope.allwin);
                    return mn / +arr.totalPrice >= 50;
                }

                function qucklyWinning() {
                    $scope.qucklyPrint();
                    Winning.quickAnimation();
                }

            }, function (e) {
                var alertPopup = $ionicPopup.alert({
                    title: '温馨提示',
                    template: '网络异常，请稍后再试'
                }).then(function (res) {
                    $scope.allwinend = $scope.allwin = 0;
                    globelMultipleData.continuesBet = 1;
                    $state.go('drawing');
                });

            });

            function dtdthen(info) {
                if ($rootScope.autoreduceAcount < globelMultipleData.continuesBet && $scope.currentIndex != globelMultipleData.continuesBet) {
                    if (barBtn.text() != '再开' + globelMultipleData.continuesBet + '期') {
                        !$scope.isAjaxRunning && $scope.submit();
                    }
                } else {
                    $rootScope.autoreduceAcount = 0;
                    $scope.currentIndex = globelMultipleData.continuesBet;
                    barBtn.text('再开' + globelMultipleData.continuesBet + "期");
                    barBtn.addClass('active');
                    status.text('已结束');
                    $scope.allwinend = $scope.allwin = 0;

                }
            }

            dtd.promise.then(dtdthen);
        };
        $scope.volumeControll = function () {
            if (!$rootScope.volume) {
                Slot.stop && Slot.stop();
                Winning.stop && Winning.stop();
                Winning.stopMusic();
                Slot.stopMusic();
            } else {
                Winning.openMusic();
                Slot.openMusic();
            }

        };
        $rootScope.volumeSwich = function () {
            $rootScope.volume = !$rootScope.volume;
            $.localStorage('volumeSwich', $rootScope.volume);
            $scope.volumeControll();
        };
        $scope.removeBucketItem = function (i, $event) {
            $event.stopPropagation();
            ballBucket.splice(i, 1);
            ballBucketIdentify.splice(i, 1);
        };
        $scope.submit(0);

      

       

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
            $rootScope.historyRecord = serverGameConfig.records.slice(0, 10);
            $rootScope.historyRecord.some(function (v, k, arr) {
                v.time = v.time.replace(/-/g, '/');
                v.time = $filter('date')(new Date(v.time), 'MM-dd HH:mm:ss');
            });

        };
        $rootScope.showRecord = function () {
            location.href = '/showrecord/detail'
        };
    }]);
con.filter('filterArray', function () {
    return function (input, type, obj) {
        var getNormalMethodName = function (type) {
            return type.replace(/\./g, '');
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





