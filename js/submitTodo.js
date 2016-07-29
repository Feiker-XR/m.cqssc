var submitTodo = new Class({
    initialize: function ($window, $rootScope, $scope, $state, $ionicPopup, Slot, Countup, Winning, Tip, $resource, $timeout, $filter, $q, $ionicScrollDelegate, $stateParams) {
        this.$window = $window;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$state = $state;
        this.$ionicPopup = $ionicPopup;
        this.Slot = Slot;
        this.Countup = Countup;
        this.Winning = Winning;
        this.Tip = Tip;
        this.$resource = $resource;
        this.$timeout = $timeout;
        this.$filter = $filter;
        this.$q = $q;
        this.$ionicScrollDelegate = $ionicScrollDelegate;
        this.$stateParams = $stateParams;
    },
    init: function () {
        this.setData();
        this.setEvent();
    },
    setData: function () {
        var self = this;
        this.barBtn = $('#barBtn');
        this.backtodw = $('.backtodw');
        this.isemptyWinning = $('.isemptyWinning-test');
        this.timeContainer = [];

        self.$scope.totalMoney = self.$stateParams.totalMoney;
        self.$scope.ballBucket = self.ballBucket;


        self.$rootScope.autoreduceAcount = 0;
        self.$scope.isAjaxRunning = false;
        self.$scope.currentIndex = 1;


        self.$scope.isNoshow = false;
        self.$scope.allwin = self.$scope.allwin || 0.0;
        self.$scope.allwinend = self.$scope.allwinend || 0.0;

        if ($.localStorage('volumeSwich')) {
            self.$rootScope.volume = $.localStorage('volumeSwich');
        }
        self.$scope.gameTypeCn = self.serverGameConfig.gameTypeCn;
    },
    setEvent: function () {
        var self = this;
        self.$rootScope.submit = self.$scope.submit = function (thisindex) {
            self.totalMoney = self.$scope.totalMoney;
            var parameter = self.getSubmitData();

            if (parameter.amount > self.serverGameConfig.balance && !window.debug) {
                var tips = new Tip("您的余额不足");
                tips.start();
                self.$state.go('drawing');
                return;
            }

            if (!self.ballBucket.length || self.$scope.isAjaxRunning) return;

            self.$resource(submitUrl, {}, {
                save: {
                    method: 'POST',
                    timeout: 20000
                }
            }).save(parameter, function (obj) {
                if (obj.isSuccess != 1) {
                    self.$ionicPopup.alert({
                        title: '温馨提示',
                        template: '网络异常，请稍后再试'
                    }).then(function (res) {
                        self.$scope.allwinend = self.$scope.allwin = 0;
                        self.globelMultipleData.continuesBet = 1;
                        self.$state.go('drawing');
                    });
                }
            }, function (e) {
                self.$ionicPopup.alert({
                    title: '温馨提示',
                    template: '网络异常，请稍后再试'
                }).then(function (res) {
                    self.$scope.allwinend = self.$scope.allwin = 0;
                    self.globelMultipleData.continuesBet = 1;
                    self.$state.go('drawing');
                });

            });

        };
        self.$scope.goPick = function () {
            self.$window.location.reload();
        };
        self.$scope.volumeControll = function () {
            if (!self.$rootScope.volume) {
                self.Slot.stop && self.Slot.stop();
                self.Winning.stop && self.Winning.stop();
                self.Winning.stopMusic();
                self.Slot.stopMusic();;
            } else {
                self.Winning.openMusic();
                self.Slot.openMusic();
            }

        };
        self.$rootScope.volumeSwich = function () {
            self.$rootScope.volume = !self.$rootScope.volume;
            $.localStorage('volumeSwich', self.$rootScope.volume);
            self.$scope.volumeControll();
        };
        self.$scope.removeBucketItem = function (i, $event) {
            $event.stopPropagation();
            self.ballBucket.splice(i, 1);
            ballBucketIdentify.splice(i, 1);
        };
        self.$scope.submit(0);

    }
})

submitTodo.implement([businesstool]);



