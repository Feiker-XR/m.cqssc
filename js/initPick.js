var initPick = new Class({
    initialize: function ($rootScope, $scope, $state, Tip, $filter, $ionicScrollDelegate, $timeout, $ionicPopup, $resource, $ionicSlideBoxDelegate, angular, ballBucket, ballBucketIdentify, game, gameFactory, globelMultipleData, danshiCache, serverGameConfig, defConfig, saveBetAwardUrl) {
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
        this.saveBetAwardUrl = saveBetAwardUrl;
        this.t = $('.text-areas');
        this.serverGameConfig = serverGameConfig;
        this.defConfig = defConfig;

        this.shareOptions = {
            ballBucket: ballBucket,
            ballBucketIdentify: ballBucketIdentify,
            game: game,
            angular: angular,
            gameFactory: gameFactory,
            globelMultipleData: globelMultipleData,
            danshiCache: danshiCache,
            serverGameConfig: serverGameConfig,
            defConfig: defConfig
        }
        this.$scope.goBack = function () {
            //add by feiker 2016-8-18 19:17:34
           if(this.ballBucket.length>0) {
               $ionicPopup.confirm({
                   title: '确认返回',
                   template: '<p style="color:gray;"> 返回上层将清空已选号码，您确定返回吗</p>',
                   buttons: [
                       {text: '取消'},
                       {
                           text: '确定',
                           type: 'button-positive',
                           onTap: function (e) {
                               window.location.href = returnUrl;
                           }
                       }
                   ]
               });
           }else{
               window.location.href = returnUrl;
           }
        };
    },
    getShareOptions: function () {
        return this.shareOptions;
    },
    init: function () {
        var self = this;
        self.hasError();
        self.styleInit();
        self.initData();
        self.initEvent();
        self.setAward();

    },
    hasError: function () {
        var self = this;
        try {
            if (!self.isDanshi(self.serverGameConfig.defaultMethod)) {
                self.$rootScope.ballsTree =  self.game[self.serverGameConfig.defaultMethod.replace(/\./g, '')].prototype.checkBallArray;
            }
        } catch (e) {
            // self.$ionicPopup.alert({
            //     title: '温馨提示',
            //     template: '网络异常,系统加载失败,请稍后重试'
            // }).then(function (res) {
            //     self.$scope.goBack();
            // });
            //return true;
            //self.$rootScope.ballsTree =  self.game['housanzhixuanfushi'].prototype.checkBallArray;  //默认的是后三复式
        }
        //return false;
    },
    setawardGroups: function (bonus) {
        var self = this;
        self.$resource(self.saveBetAwardUrl).get({
            // "CGISESSID": self.CGISESSID,
            "awardGroupId": bonus || self.$scope.bonus.choice
        }, function (obj) {
            if (obj.status != 1) {
                !window.debug && self.$scope.goBack();;
                return false;
            }
            (new self.Tip('奖金组设置成功')).start();
        });
    },
    t: $('.text-areas'),
    setAward: function () {
        var self = this;
        if (self.serverGameConfig.awardGroupRetStatus == null && self.serverGameConfig.awardGroups && !window.debug) {
            if (self.serverGameConfig.awardGroups.length > 1) {
                var aG = self.serverGameConfig.awardGroups;
                var bonusHtml = "<ion-list class='select-jjz'>";
                for (var a in aG) {
                    bonusHtml += ('<ion-radio ng-model="bonus.choice" ng-value="' + aG[a].awardGroupId + '">' + aG[a].awardName.replace('奖金组', '') + '</ion-radio>');
                }
                bonusHtml += '</ion-list>'+"<hr class='clear '><p>注: 奖金组一经设定,不可修改</p>";
                self.$scope.bonus = {'choice': self.serverGameConfig.awardGroups[self.serverGameConfig.awardGroups.length - 1].awardGroupId};
                self.$ionicPopup.show({
                    template: bonusHtml,
                    title: '温馨提示',
                    subTitle: '请选择一个奖金组,便于您投注时使用。',
                    scope: self.$scope,
                    buttons: [
                        {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if (!self.$scope.bonus.choice) {
                                    e.preventDefault();
                                } else {
                                    self.setawardGroups();
                                    return self.$scope.bonus;
                                }
                            }
                        },
                        {
                            text: '取消',
                            type: 'button-default',
                            onTap: function (e) {
                                !window.debug && self.$scope.goBack();
                            }
                        }
                    ]
                });

            } else {
                self.setawardGroups(self.serverGameConfig.awardGroups[0].awardGroupId);
            }

        }
    },
    initEvent: function () {
        var self = this;
        self.$scope.cloaseAllWindow = function () {
            self.$scope.poptypeshow = false;
            self.$scope.menuShow = false;
            self.$scope.extraisShow = false;
        };
        self.$scope.clickMutit = function ($event) {
            self.$scope.extraisShow = true;
            $event.stopPropagation();
        };
        self.$scope.changeMethod = function ($event) {
            if (!self.$rootScope.iseditor) {
                self.$scope.poptypeshow = !self.$scope.poptypeshow;
            }
            self.$scope.switchMethodBox();
            $event.stopPropagation();
        };

        self.$scope.switchMethodBox = function () {
            if(self.$scope.poptypeshow){
                $('#methodBox').css('height','1200px');
            }else{
                $('#methodBox').css('height','0px');
            }
        };

        self.$rootScope.yuanjiao = function () {
            self.$rootScope.moneyUnit == 1 ? (self.$rootScope.moneyUnit = 0.1) : (self.$rootScope.moneyUnit = 1);
            var a = new self.Tip('已切换' + self.defConfig.moneyUnitData[self.$rootScope.moneyUnit] + "模式");
            a.start();
            self.$rootScope.premoneyUnit = self.$rootScope.shopCar.moneyUnit = self.$rootScope.moneyUnit;
            $.localStorage('yuanjiao', self.$rootScope.premoneyUnit);
            self.getResult(1, self.getNormalMethodName(self.$rootScope.currentMethodName));
        };

        self.$rootScope.fandian = function () {
            var tipStr = '';
            if (self.$rootScope.awardMode == 1) {
                self.$rootScope.shopCar.awardMode = self.$rootScope.awardMode = 2;
                tipStr = '<span>返点已转化为奖金<br />（当前 1880奖金组）</span>';
            }
            else if (self.$rootScope.awardMode == 2) {
                self.$rootScope.shopCar.awardMode = self.$rootScope.awardMode = 1;
                tipStr = '<span>保留投注返点<br />（当前 1800奖金组）</span>';
            }
            (new self.Tip(tipStr)).start();
        };

        self.$scope.initMM = function () {
            return self.uniquePrefix();
        };

        self.$scope.initMethed = function (i, item, type, name, iii) {
            item.type = type;
            item.label = name;
            var defaultMethod = self.$rootScope.serverGameConfig.defaultMethod;
            if (defaultMethod == type) {
                var classifyName = type.substr(0, type.indexOf('.'));
                for (var keys in  self.$scope.initilesData) {
                    var n = self.$scope.initilesData[keys];
                    if (n.name == classifyName) {
                        n.active = true;
                        var showIndex = n.i;
                        setTimeout(function () {
                            self.$scope.slideChange(showIndex);
                        }, 100)
                    }
                }

                self.business(item);
            }

            if (self.$rootScope.gameMethedsCollection.indexOf(item) == self.$rootScope.gameMethedsCollection.lastIndexOf(item)) {
                self.$rootScope.gameMethedsCollection.push(item);
            }

            return self.uniquePrefix()
        };
        self.$rootScope.ballBucket = self.ballBucket;

        self.$scope.customMutiple = function (pluse, $event) {
            if (!self.$scope.extraisShow) return;
            var shopCar = self.$rootScope.shopCar;
            var multipleLimit = self.serverGameConfig.gameLimits[self.$rootScope.currentMethodName].maxmultiple / shopCar.moneyUnit;
            shopCar.multiple += pluse;
            // shopCar.multiple >= multipleLimit ? (shopCar.multiple = multipleLimit) : shopCar.multiple <= 1 ? (shopCar.multiple = 1) : shopCar.multiple;
            shopCar.multiple = Math.max(1, shopCar.multiple);
            shopCar.multiple = Math.min(multipleLimit, shopCar.multiple);
            self.$scope.mintotal = self.$filter('number')(shopCar.count * shopCar.onePrice * shopCar.moneyUnit * shopCar.multiple, 1);
            if (self.game[self.getNormalMethodName(self.$rootScope.currentMethodName)].prototype.isEditor) {
                self.$rootScope.editorCurrentBacket.multiple = shopCar.multiple;
            }
            $event.stopPropagation();
        };
        self.$scope.goBucket = function (iseditor) {
            if (self.$rootScope.isDanshi) {

                var d = self.$scope.danshiData;
                var b = d.data.join(' ');
                var s = self.$rootScope.shopCar;
                var len = d.data.length;

                var item = rs = {
                    "isDanshi": true,
                    "count": len,
                    "moneyUnit": s.moneyUnit,
                    "awardMode": s.awardMode,
                    "onePrice": s.onePrice,
                    "multiple": s.multiple,
                    "total": s.total,
                    "continuesBet": s.continuesBet,
                    "label": self.$rootScope.currentMethodTitle,
                    "type": self.$rootScope.currentMethodName,
                    "maxmultiple": self.game[self.getNormalMethodName(self.$rootScope.currentMethodName)].prototype.maxmultiple,
                    "ballLabel": b,
                    "refer": self.$rootScope.currentMethodName + '=>' + b,
                    "totalMultiple": 1
                };


                if (len > 0 && $('.text-areas').val().trim()) {
                    if (self.removeDuplicateData(item.refer, item)) {
                        new self.Tip('该注单已存在!').start();
                    } else {
                        self.ballBucket.unshift(item);
                        self.ballBucketIdentify.unshift(item.refer);
                    }
                }

                if (len > 0 || !self.isEmptyballBucket()) {
                    self.$state.go("drawing");
                } else {
                    new self.Tip('请输入符合规范的注单').start();
                }

            } else {
                var iscount = self.$rootScope.setBukets(iseditor, true);
                if (!self.isEmptyballBucket() && !self.$rootScope.hasChoose || iscount) {
                    if (iseditor && !iscount) {
                        new self.Tip('号码选择不完整，请重新选择！').start();
                    } else {
                        if (iseditor) {
                            var rs = self.$rootScope.shopCar;
                            var sc = self.$rootScope.currentEditingItem;
                            sc.count = rs.count;
                            sc.moneyUnit = rs.moneyUnit;
                            sc.awardMode = rs.awardMode;
                            sc.multiple = rs.multiple;
                            sc.onePrice = rs.onePrice;
                            sc.total = rs.total;
                            sc.continuesBet = rs.continuesBet;
                        }

                        self.game[self.getNormalMethodName(self.$rootScope.currentMethodName)].prototype.isEditor = false;
                        self.$rootScope.iseditor = false;
                        self.getTotalAll();
                        self.$rootScope.shopCar = self.getShopCar();
                        self.$state.go("drawing");

                    }
                }
            }
            //console.log(this.ballBucket);
        };

        self.$rootScope.setBukets = function (iseditor, fromGoBucket) {
            if ('imadanshi' == iseditor) {
                self.$scope.goBucket();
                return;
            }

            var rs = self.$rootScope.shopCar;
            var type = self.$rootScope.currentMethodName;
            rs.label = self.$rootScope.currentMethodTitle;
            var count = rs.count;
            if (rs.count > 0 && self.isNotModity(type)) {
                self.setRS(rs, type);
                self.$rootScope.shopCar = self.getShopCar();
                self.cleanupBalls(self.getNormalMethodName(type));
                self.$scope.mintotal = 0;
            } else {
                var count = self.game[self.getNormalMethodName(type)].prototype.getData().count;
                if (count <= 0 && self.$rootScope.hasChoose) {
                    var tips = new self.Tip(self.game[self.getNormalMethodName(type)].prototype.tip || "您选择的号码不完整");
                    tips.start();
                } else {

                    if (!self.ballBucket.length || !fromGoBucket) {
                        self.$scope.getRandom();
                    }

                    return self.ballBucket.length;

                }
            }
            return count > 0;
        };

        self.$scope.showPlayInfo = function () {


            var confirmPopup = self.$ionicPopup.confirm({
                title: '玩法说明',
                cssClass: 'showPlayInfo',
                template: self.game[self.getNormalMethodName(self.$rootScope.currentMethodName)].prototype.tip + '<br />基础奖金' + '1800元',
                cancelText: '查看玩法说明',
                okText: '关闭'
            });

            confirmPopup.then(function(res) {
                if(res) {
                } else {
                    top.location.href='#/intro';
                }
            });
        }

        self.$scope.slideHander = function (i) {
            self.$ionicSlideBoxDelegate.slide(i);
        }

        self.$scope.slideHasChanged = function (i) {
            !isNaN(i) && self.resetTitleActive(i, self.$scope.initilesData);
        };
        self.$scope.slideChange = function (i, $event) {
            if (i != undefined) {
                self.$ionicSlideBoxDelegate.slide(i);
                self.resetTitleActive(i, self.$scope.initilesData);
                $event && $event.stopPropagation();
            }
        };
//超级2000和普通玩法导航切换
        self.$scope.mainSlideChange = function (i, $event) {
            if (i != undefined) {
                if (i == 0) {
                    $("#play_type_box").animate({'margin-left': '0px'});
                    $(".ar-poptype .strategy-select").removeClass('super-2000');
                }
                if (i == 1) {
                    $("#play_type_box").animate({'margin-left': '-100%'});
                    $(".ar-poptype .strategy-select").addClass('super-2000');
                    //self.$scope.slideChange(8,$event);
                }
                $event && $event.stopPropagation();
            }
        };


        self.$scope.initiles = function (i, obj) {
            self.$scope.initilesData.push({i: i, active: false, name: obj.name});
            return self.uniquePrefix();
        }


        self.$rootScope.setGrounpChoose = function (name, balls, val, dxqdsq, type) {
            for (var key in dxqdsq)dxqdsq[key].cur = false;
            val.cur = true;
            self.game._.daxiaodanshuangqing(balls, name);
            self.getResult('', type);
        };


        self.$scope.result = function (bin, index, type, value) {
            if (/^.+?baodan$/.test(type)) self.game._.daxiaodanshuangqing(bin, 'qing');
            bin[index] = !bin[index];
            self.getResult(index, type);
            self.$rootScope.showRecord10(true);
        };

        self.$rootScope.getRandom = function () {
            var type = self.getNormalMethodName(self.$rootScope.currentMethodName);
            self.game[type].prototype.getramdom();
            self.getResult(1, type);

        }

        self.$scope.chooseGame = function (item, iii) {
            self.business(item, iii);
            $('#methodBox').css('height','0px');
            self.$timeout(function () {
                self.$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
            }, 100);
        };

        self.$scope.textareaSubmit = function () {

            var val = self.t.val();
            self.t.prop('disabled', true);
            self.$rootScope.beforesubmited = false;
            self.getResult(1, self.$rootScope.currentMethodName, val);
            self.t.val(self.$scope.danshiData.data.join(' '));
            var notEmpty = self.$scope.danshiData.data.join(' ').trim();
            if (!notEmpty) {
                new self.Tip('请输入符合规范的注单').start();
            }
        }
        self.$scope.cancelSubmited = function () {
            self.t = $('.text-areas');
            self.t.prop('disabled', false);
            self.$rootScope.beforesubmited = true;
            self.t.val(self.$scope.textaraData);
        };

        self.$scope.helprule = function () {
            self.$ionicPopup.alert({
                title: '温馨提示',
                template: '<p   style="color:#888;font-size:12px;line-height:170%; text-align: left;">1.输入的注单请参照如下规则：单注内各号码保持相连，不同注号码间用分隔符隔开;<br>2.分隔符支持：回车[ ]空格[ ]逗号[,]分号[;]冒号[:]竖线[|];<br>3.文件较大时，提交注单可能需要一定时间，请耐心等待;</p>',
                buttons: [
                    {text: '确定', type: 'button-positive'}
                ]
            })
        };

        self.$scope.textareaFocus = function () {
            self.$rootScope.isfocus = true;
            $('#tips-danshi').hide();
        };
        self.$scope.textareaBlur = function () {
            var hasVal = $('.text-areas').val().trim();
            if (!hasVal) {
                self.$rootScope.isfocus = false;
            }
        };
        self.$scope.showtextareaError = function () {
            var danshiData = self.$scope.danshiData;
            var err = danshiData.errorData.join(' ');
            var rp = danshiData.repeatData.join(' ');
            var tpl = "<div>错误项:</div>";
            tpl += ("<p>" + err + "</p>");
            tpl += "<div>重复项:</div>";
            tpl += ("<p>" + rp + "</p>");

            self.$ionicPopup.alert({
                title: '温馨提示',
                template: tpl,
                buttons: [
                    {
                        text: '确定',
                        type: 'button-positive',
                        onTap: function (e) {

                        }
                    }
                ]
            });
        };
        self.$scope.clearVal = function () {
            self.t = $('.text-areas');
            self.$scope.valsss = $('.text-areas').val();


            self.t.val().trim() && self.$ionicPopup.alert({
                title: '是否清空所有注单',
                template: '<p class="popup-param">清空注单:{{valsss}}</p>',
                scope: self.$scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '确定',
                        type: 'button-positive',
                        onTap: function (e) {
                            self.t.val('');
                        }
                    }
                ]
            });
        };


    },
    styleInit: function () {
        var self = this;
        self.$scope.options = {
            loop: false,
            effect: 'fade',
            speed: 500,
        }
        self.$scope.data = {};
        self.$scope.$watch('data.slider', function (nv, ov) {
            self.$scope.slider = self.$scope.data.slider;
        });


        setTimeout(function () {
            var s = $('.slider')
            s.css('height', s.height());
        }, 500);

        var p = $('.custompluse .pluseitem');
        p.on({
            'touchstart': function () {
                p.removeClass('cur');
                $(this).addClass('cur');
            }, 'touchend': function () {
                p.removeClass('cur');
            }
        });

    },
    initData: function () {
        var self = this;
        this.getissueInfo();
        self.$scope.initilesData = [];
        self.serverGameConfig = self.$rootScope.serverGameConfig = self.serverGameConfig;

        self.$rootScope.beforesubmited = true;

        self.$rootScope.balance = self.serverGameConfig.balance;
        self.$rootScope.globelMultipleData = self.globelMultipleData;


        if (!$.localStorage('yuanjiao')) {
            self.$rootScope.premoneyUnit = self.$rootScope.moneyUnit = self.defConfig.moneyUnit;
            $.localStorage('yuanjiao', self.$rootScope.premoneyUnit);
        } else {
            self.$rootScope.premoneyUnit = self.$rootScope.moneyUnit = self.defConfig.moneyUnit = $.localStorage('yuanjiao');
        }
        self.$rootScope.awardMode = self.defConfig.awardMode;

        self.$rootScope.onePrice = self.defConfig.onePrice;
        self.$rootScope.multiple = self.defConfig.multiple;
        self.$rootScope.multipleLimit = self.$scope.multipleLimit = self.defConfig.multipleLimit;

        self.$rootScope.currentMethodTitle = '';
        self.$scope.startPosstion = 0;
        self.$rootScope.gameMethedsCollection = self.$rootScope.gameMethedsCollection || [];
        self.$rootScope.historyGameMethedsCollection = self.$rootScope.historyGameMethedsCollection || [];
        self.$scope.range = self.game._.range;

        self.$rootScope.shopCar = self.getShopCar();
    },
    uniquePrefix: function () {
        if (!window.uniquePrefixId) window.uniquePrefixId = 1;
        var id = ++window.uniquePrefixId;
        return Math.random() * id;
    },

    getCurrentIssue: function () {
        return $.get(this.serverGameConfig.dynamicConfigUrl);
    },
    getissueInfo: function () {
        var self = this;
        self.getCurrentIssue().then(function (data) {
            self.$scope.IssueInfo = data.data;
            self.$rootScope.IssueInfo = data.data;
            self.issueTimeCounter(data.data);
        });
    },
    issueTimeCounter: function (info) {
        var self = this;
        var nowNumber = info.number;
        var NowTime = new Date(info.nowtime.replace(/-/g, '/'));
        var EndTime = new Date(info.nowstoptime.replace(/-/g, '/'));

        function GetRTime() {
            var t = EndTime - NowTime;
            EndTime.setTime(EndTime.getTime() - 1000);
            if (t >= 0) {
                self.$scope.issueMinitus = Math.floor(t / 1000 / 60 % 60);
                self.$scope.issueSeconed = Math.floor(t / 1000 % 60);
                self.$scope.issueNumber = nowNumber.split('-')[1];
                self.$timeout(GetRTime, 1000);
            } else {
                self.getissueInfo();
                self.showAlert('当前销售截止,进入下期购买');
            }
        }

        self.$timeout(GetRTime, 1000);
    },
    showAlert: function(text) {
        var self = this;
        new self.Tip(text).start();
    }

});

initPick.implement([businesstool]);









