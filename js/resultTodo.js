var resultTodo = new Class({
        initialize: function ($rootScope, $scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, Tip, $timeout) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$ionicPopup = $ionicPopup;
            this.$ionicScrollDelegate = $ionicScrollDelegate;
            this.$filter = $filter;
            this.Tip = Tip;
            this.$timeout = $timeout;
        },
        init: function () {
            var self = this;
            self.isEmptyballBucket() && self.$state.go('pick');
            this.initEvent();
            this.intiStyle();
            this.initData();
        },
        intiStyle: function () {
            var self = this;
            $('#changeContinuesBet').on({
                'input': function () {
                    var v = $(this).val();
                    if (v > 50) {
                        v = 50;
                        $(this).val(v)
                    }

                    if (v == 0) {
                        v = 1;
                    }

                    self.$scope.$apply(function () {
                        self.globelMultipleData.continuesBet = v;
                        self.$scope.changeContinuesBet();
                    });
                }, 'blur': function () {
                    self.$scope.$apply(function () {
                        if (self.globelMultipleData.continuesBet == '' || self.globelMultipleData.continuesBet == 0) {
                            self.globelMultipleData.continuesBet = 1;
                        }
                    });
                },
                'focus': function (e) {
                    $(this).val('');
                    self.$scope.$apply(function () {
                        self.globelMultipleData.continuesBet = '';
                    });
                }
            });
            $("#globleMultipleChange").on({
                'input': function () {
                    var v = $(this).val();
                    if (v == 0) {
                        v = 1;
                    }
                    self.$scope.$apply(function () {
                        self.globelMultipleData.multiple = v;
                        self.$scope.globleMultipleChange();
                    });

                }, 'blur': function () {
                    self.$scope.$apply(function () {
                        if (self.globelMultipleData.multiple == '' || self.globelMultipleData.multiple == 0) {
                            self.globelMultipleData.multiple = 1;
                        }

                        self.$scope.globleMultipleChange();
                    });
                },
                'focus': function (e) {
                    $(this).val('');

                    self.$scope.$apply(function () {
                        self.globelMultipleData.multiple = '';
                    });
                }
            });
        },
        initData: function () {
            var self = this;
            self.$rootScope.totalObject = {totalMoney: 0, totalCount: 0, totalM: 0};
            if ($.localStorage('volumeSwich')) {
                self.$rootScope.volume = $.localStorage('volumeSwich');
            }
        },
        initEvent: function () {
            var self = this;
            self.$scope.removeBucketItem = function (i, $event) {
                $event.stopPropagation();
                self.ballBucket.splice(i, 1);
                self.ballBucketIdentify.splice(i, 1);
                if (!self.ballBucket.length) {
                    self.$rootScope.totalObject.totalM = 0;
                    self.$rootScope.totalObject.totalCount = 0;
                }
            };
            self.$scope.resetGlobalMultil = function () {
                var minObj = self.ballBucket[0];
                self.ballBucket.some(function (v, k) {
                    var am = v.maxmultiple / v.moneyUnit;
                    var bm = minObj.maxmultiple / minObj.moneyUnit;
                    if (am <= bm) {
                        minObj = v;
                    }
                });
                return self.$rootScope.currentMinMutiple = minObj;
            };

            self.$scope.resetFactMultil = function (obj) {
                var mt = obj.maxmultiple / obj.moneyUnit;
                if (obj.multiple * self.globelMultipleData.multiple > mt) {
                    self.globelMultipleData.multiple = Math.floor(mt / obj.multiple);
                    new self.Tip('倍投超限').start();
                }

            };
            self.$scope.resetObjMultiple = function () {
                var obj = self.$scope.resetGlobalMultil();
                if (!obj) return;
                self.$scope.resetFactMultil(obj);

                var multipleLimit = self.$rootScope.currentMinMutiple.maxmultiple / self.$rootScope.currentMinMutiple.moneyUnit;
                self.globelMultipleData.multiple = self.globelMultipleData.multiple >= multipleLimit ? (self.globelMultipleData.multiple = multipleLimit) : (self.globelMultipleData.multiple <= 1 ? self.globelMultipleData.multiple = 1 : self.globelMultipleData.multiple);

                for (var i = 0; i < self.ballBucket.length; i++) {
                    var obj = self.ballBucket[i];
                    obj.totalMultiple = obj.multiple * self.globelMultipleData.multiple;
                    if (self.globelMultipleData.continuesBet > 1) {
                        obj.totalMultiple = self.globelMultipleData.multiple;
                    }
                }
            };
            self.$scope.minderMutl = function () {
                self.globelMultipleData.multiple <= 1 ? (self.globelMultipleData.multiple = 1) : (self.globelMultipleData.multiple = self.globelMultipleData.multiple - 1);
                self.$scope.resetObjMultiple();
            };
            self.$scope.changeContinuesBet = function (isPluse) {
                if (isPluse) {
                    self.globelMultipleData.continuesBet++;
                }
                if (!self.globelMultipleData.continuesBet) {
                    self.globelMultipleData.continuesBet = 1;
                }
                if (self.globelMultipleData.continuesBet > 50) {
                    self.globelMultipleData.continuesBet = 50;
                }
            };
            self.$scope.plusContinuesBet = function() {
                self.$scope.changeContinuesBet(true);
                self.$scope.resetObjMultiple();
            }
            self.$scope.minusContinuesBet = function() {
                // 连开数减一后检查是否小于1,如果小于则重置为1
                self.globelMultipleData.continuesBet--;
                self.globelMultipleData.continuesBet = Math.max(1, self.globelMultipleData.continuesBet);
                self.$scope.resetObjMultiple();
            }

            self.$scope.globleMultipleChange = function (isPluse) {
                var multipleLimit = self.$rootScope.currentMinMutiple;
                isPluse && self.globelMultipleData.multiple++;
                self.$scope.resetObjMultiple();
            };


            self.$scope.initBacketList = function ($index, obj) {
                if (!$index) {
                    self.$rootScope.totalObject.totalM = 0;
                    self.$rootScope.totalObject.totalCount = 0;
                    self.$scope.globleMultipleChange();
                }
                obj.totalMultiple = obj.multiple * self.globelMultipleData.multiple;

                self.$rootScope.totalObject.totalM += (obj.count * obj.onePrice * obj.multiple * obj.moneyUnit);
                self.$rootScope.totalObject.totalCount += (obj.count);
                return $index;
            };

            self.$scope.globleMultipleChange();

            self.$scope.gosubmit = function () {
                self.totalMoney = self.$scope.totalMoney;
                var parameter = self.getSubmitData();
                if (parameter.amount > self.serverGameConfig.balance && !window.debug) {
                    var tips = new self.Tip("您的余额不足");
                    tips.start();
                    return;
                }
                if (self.isEmptyballBucket()) {
                    new self.Tip('请先添加注单').start();
                } else {
                    self.$state.go('submit', {totalMoney: self.$scope.totalMoney}, {
                        location: true,
                        reload: true,
                        inherit: true,
                        notify: true
                    });
                }
            };

            self.$scope.editLottory = function (item) {
                if (!item.isDanshi) {
                    self.$rootScope.currentMethodName = item.type;
                    self.$rootScope.currentMethodTitle = item.label;
                    self.editBalls(self.getNormalMethodName(self.$rootScope.currentMethodName), item);
                    self.$timeout(function () {
                        self.$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
                    }, 100);
                }
            };

            self.$scope.goPick = function () {
                if (self.$rootScope.isDanshi) {
                    self.$state.go('pick');
                    setTimeout(function () {
                        self.$rootScope.$apply(function () {
                            self.clearDanshicache();
                            $('.text-areas').prop('disabled', false);
                            self.$rootScope.beforesubmited = true;
                            self.$rootScope.isfocus = false;
                        });
                    }, 100);

                } else {
                    self.$rootScope.iseditor = false;
                    self.$rootScope.currentMethodName = self.$rootScope.ProcurrentMethodName;
                    self.$rootScope.currentMethodTitle = self.$rootScope.PrecurrentMethodTitle;
                    var type = self.$rootScope.currentMethodName;
                    self.getResult(1, type);
                    self.cleanupBalls(type);
                    self.$rootScope.shopCar = self.getShopCar();
                    self.$state.go('pick');
                    self.$rootScope.moneyUnit = self.$rootScope.premoneyUnit;

                    self.$timeout(function () {
                        self.$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
                    }, 100);
                }
            };

            self.$rootScope.goBack = function () {
                self.$scope.goPick();
            };

            self.$scope.showConfirm = function () {
                if (self.isEmptyballBucket()) return;
                self.$ionicPopup.confirm({
                    title: '是否清空所有注单',
                    template: '<p class="popup-param">确定要清空吗</p>',
                    buttons: [
                        {text: '取消'},
                        {
                            text: '确定',
                            type: 'button-positive',
                            onTap: function (e) {

                                self.$rootScope.totalObject.totalM = 0;
                                self.$rootScope.totalObject.totalCount = 0;
                                self.cleanupballBucket();
                                var type = self.$rootScope.currentMethodName;
                                self.getResult(1, type);
                            }
                        }
                    ]
                });

            };
            self.$rootScope.getrandomBalls = function () {
                var type = self.$rootScope.currentMethodName;
                self.cleanupBalls(type);
                self.game[self.getNormalMethodName(type)].prototype.getramdom();
                self.getResult(1, type);
                var rs = self.$rootScope.shopCar;
                if (rs.count > 0 && self.isNotModity(type)) {
                    self.setRS(rs, type);
                }
            };

            self.$rootScope.volumeSwich = function () {
                self.$rootScope.volume = !self.$rootScope.volume;
                $.localStorage('volumeSwich', self.$rootScope.volume);
            };
        }
    }
);

resultTodo.implement([businesstool]);



