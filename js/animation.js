jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });


angular.module('starter.animation', [])
    /**
     * 老虎机动画
     */
    .factory('Slot', function () {
        function slotAnimation() {
            this.$dom = {};
        }

        slotAnimation.prototype = {
            init: function (arr, $id) {
                if (!arr || !$.isArray(arr)) return;
                this.$dom = $($id);
                this.arr = arr;
                this.$number = this.$dom.find('.number-list li span');
                this.$barup = this.$dom.find('.drawbar-up');
                this.$bardown = this.$dom.find('.drawbar-down');
                this.height = this.$dom.find('.number-list li').height();
                this.audioStop = new Howl({
                    urls: [basePath + 'img/stop.mp3']
                });
                this.playMusic = true;

            },
            start: function (fncallback) {
                this.barAnimation(fncallback);
            },
            //拉杆动画
            barAnimation: function (fncallback) {
                this.$barup.animate({
                    opacity: 'hide'
                }, 300, function () {
                    $(this).animate({
                        opacity: 'show'
                    }, 300);
                });
                this.$bardown.animate({
                    opacity: 'show'
                }, 300, function () {
                    $(this).animate({
                        opacity: 'hide'
                    }, 300);
                });
                this.numberAnimation(fncallback);
            },
            //滚轮动画
            reset: function () {
                //this.$number.css('margin-top', -6336);
            },

            timeArray: [],
            numberAnimation: function (fncallback) {
                var _this = this;
                //滚轮动画
                this.reset();
                this.$number.each(function (index, ele) {
                    _this.timeArray.push(setTimeout(function () {
                        $(ele).stop(false, true).animate({
                            marginTop: '-=1500'
                        },1).stop(false, true).animate({
                            marginTop: -(6480 - _this.height * 10 * 2 + _this.arr[index] * _this.height ) + 'px'
                        }, {
                            duration: 2000,
                            progress: progress,
                            done: function () {
                                if (_this.playMusic) {
                                    _this.audioStop.play();
                                }

                                if (_this.$number.length == index + 1) {
                                    fncallback && fncallback();
                                }
                                _this.isNeedQuikly = false;
                            }
                        });
                    }, 300 * index));
                });
                function progress(obj, tween) {
                    if (_this.isNeedQuikly) {
                        obj.duration = 200;
                    }
                }


            },
            cleanTimeArray: function () {
                for (; this.timeArray.length;) {
                    clearTimeout(this.timeArray.shift());
                }
            },
            stop: function () {
                this.audioStop && this.audioStop.stop();
            },
            play: function () {
                this.audioStop && this.audioStop.play();
            },
            isNeedQuikly: false,
            quickAnimation: function (fncallback) {
                var _this = this;
                this.isNeedQuikly = true;
                this.cleanTimeArray();
                var i = 0;
                this.$number.each(function (index, ele) {
                    $(ele).stop(false, true).animate({
                        marginTop: -(6480 - _this.height * 10 * 2 + _this.arr[index] * _this.height ) + 'px'
                    }, {
                        duration: 200,
                        done: function () {
                            i++;
                            if (i > _this.$number.length - 1) {
                                fncallback && fncallback();
                            }

                        }
                    });
                });
            },
            noQuickAnimation: function () {
                this.isNeedQuikly = false;
            },
            stopMusic: function () {
                this.playMusic = false;
            },
            openMusic: function () {
                this.playMusic = true;
            }
        }
        return new slotAnimation();
    })
    //打印机动画
    .animation('.repeated-item', function () {
        return {
            enter: function (element, done) {
                jQuery(element).css({'marginTop': -jQuery(element).height()});
                jQuery(element).animate({
                    marginTop: '0px'
                }, 'liner', done);

                return function (isCancelled) {
                    if (isCancelled) {
                        jQuery(element).stop();
                    }
                }
            },
            leave: function (element, done) {
                element.css('opacity', 1);
                jQuery(element).animate({
                    marginTop: '500px',
                    opacity: 0
                }, done);

                return function (isCancelled) {
                    if (isCancelled) {
                        jQuery(element).stop();
                    }
                }
            },
            // you can also capture these animation events
            addClass: function (element, className, done) {
            },
            removeClass: function (element, className, done) {
            }
        }
    })
    .factory('Countup', ['$filter', function ($filter) {
        function CountUp($el, startVal, endVal, duration, decimals) {
            var lastTime = 0;
            var vendors = ['webkit', 'moz', 'ms', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                    window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                }
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                }
            }
            this.isNeedQuikly = false;
            this.quickAnimation = function (fncallback) {
                this.isNeedQuikly = true;
            };
            this.d = $el.get(0);
            this.startVal = startVal;
            this.endVal = endVal;
            this.countDown = (this.startVal > this.endVal);
            this.frameVal = this.startVal;
            this.duration = duration * 500 || 1000;
            this.decimals = Math.max(0, decimals || 2);
            this.dec = Math.pow(10, this.decimals);
            var self = this;

            // Print value to target
            this.printValue = function (value) {
                var result = $filter('number')(value, this.decimals);
                this.d.innerHTML = result;
            }
            // Robert Penner's easeOutExpo
            this.easeOutExpo = function (t, b, c, d) {
                return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
            }

            this.count = function (timestamp) {

                if (!self.startTime) self.startTime = timestamp;

                self.timestamp = timestamp;

                var progress = timestamp - self.startTime;
                self.remaining = self.duration - progress;

                // always ease
                if (self.countDown) {
                    self.frameVal = self.startVal - self.easeOutExpo(progress, 0, self.startVal - self.endVal, self.duration);
                } else {
                    self.frameVal = (self.easeOutExpo(progress, self.startVal, self.endVal - self.startVal, self.duration)).toFixed(2);
                }

                // don't go past endVal since progress can exceed duration in the last frame
                if (self.countDown) {
                    self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
                } else {
                    self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
                }

                // format and print value
                self.frameVal = Math.round(self.frameVal * self.dec) / self.dec
                self.printValue(self.frameVal);

                // whether to continue
                if (progress < self.duration) {
                    self.rAF = requestAnimationFrame(self.count);
                } else {
                    if (self.callback) self.callback();
                }
            }
            // start your animation
            this.start = function (callback) {
                self.callback = callback;
                // make sure values are valid
                if (!isNaN(self.endVal) && !isNaN(self.startVal) && self.startVal !== self.endVal) {
                    self.rAF = requestAnimationFrame(self.count);
                } else {
                    this.d.innerHTML = endVal;
                }
                return false;
            }
            // reset to startVal so animation can be run again
            this.reset = function () {
                self.paused = false;
                delete self.startTime;
                self.startVal = startVal;
                cancelAnimationFrame(self.rAF);
                self.printValue(self.startVal);
            }
            // pass a new endVal and start animation
            this.update = function (newEndVal) {
                delete self.callback; // avoid endless callback loop
                cancelAnimationFrame(self.rAF);
                self.paused = false;
                delete self.startTime;
                self.startVal = self.frameVal;
                self.endVal = Number(newEndVal).toFixed(2);
                self.countDown = (self.startVal > self.endVal);
                self.rAF = requestAnimationFrame(self.count);
            };

            // format startVal on initialization
            self.printValue(self.startVal);
        }

        return CountUp;

    }])

    .factory('Winning', function () {
        function winAnimation() {
            this.$dom = $('#drawingContent').find('.scroll');
            this.$bigWin = this.$dom.find('.big-win');
            this.$light = this.$dom.find('.slot-light');
            this.audioBigwin = new Howl({
                urls: [basePath + 'img/background.mp3', basePath + 'img/background.WAV', basePath + 'img/background.OGG'],
                loop: true
            });
            this.playMusic = true,
                this.award = 1

        }

        winAnimation.prototype = {
            init: function () {
            },
            start: function (bigwin, award, callback) {
                if (bigwin) {
                    this.bigwinStart(callback);
                }
                if (award && typeof award == 'number') {
                    this.award = award;
                }
                ;
                this.creatCoin(bigwin, callback);
            },
            isNeedQuikly: false,
            quickAnimation: function (fncallback) {
                this.isNeedQuikly = true;
                this.$bigWin.removeClass('win-animation').hide();
                this.$light.removeClass('active');
                this.audioBigwin.stop();
                this.endamin(fncallback);
            },
            noQuickAnimation: function () {
                this.isNeedQuikly = false;
            },
            endamin: function (callback) {
                $('.iconrmb').delay(0).stop(false, true);
                this.mybigwinEnd();
                this.$dom.find('.iconrmb').remove();
                callback && callback();
            },
            creatCoin: function (bigwin, callback) {
                var _this = this;
                var forStart = 0;
                this.callback = callback;
                function progress(obj, tween) {
                    if (_this.isNeedQuikly) {
                        $('.iconrmb').delay(0);
                        $('.iconrmb').stop(false, true);
                        _this.mybigwinEnd();
                    }
                };
                var coinNumbers = this.award * 2 + 28;
                if (this.playMusic) {
                    this.audioBigwin = new Howl({
                        urls: [basePath + 'img/background.WAV', basePath + 'img/background.OGG', basePath + 'img/background.mp3'],
                        loop: true
                    });
                    //console.log(this.audioBigwin);
                    this.audioBigwin.play();
                }
                for (var i = 0; i < coinNumbers; i++) {
                    var $coin = $('<span class="iconrmb"></span>');
                    $coin.css({
                        'left': Math.random() * 100 + '%',
                        '-webkit-transform': 'rotate(' + Math.random() * 360 + 'deg)' + ' ' + 'scale(' + (Math.random() * 0.2 + 1) + ')'
                    })
                    $('#drawingContent').find('.scroll').append($coin);
                    $coin.delay(Math.random() * (_this.award * 1000)).animate({'top': $('#drawingContent').height()}, {
                        duration: 2000,
                        progress: progress,
                        easing: "easeInQuad",
                        done: function () {
                            forStart++;
                            $(this).remove();
                            if (forStart >= coinNumbers) {
                                _this.bigwinEnd();
                                callback && callback();
                            }
                        }
                    });

                }

            },
            bigwinStart: function (callback) {
                this.$bigWin.show().addClass('win-animation');
                this.$light.addClass('active');
                //if (this.playMusic) {
                //    this.audioBigwin.play();
                //}
            },
            bigwinEnd: function () {
                this.$bigWin.removeClass('win-animation').hide();
                this.$light.removeClass('active');
                this.audioBigwin.stop();
            },
            mybigwinEnd: function () {
                this.bigwinEnd();
                this.$dom.find('.iconrmb').remove();
            },
            stop: function () {
                this.audioBigwin && this.audioBigwin.stop();
            },
            play: function () {
                this.audioBigwin && this.audioBigwin.play();
            },

            stopMusic: function () {
                this.playMusic = false;
            },
            openMusic: function () {
                this.playMusic = true;
            }
        }
        return new winAnimation();
    })
    .factory('Tip', function () {
        function tipAnimationo(word, dom) {
            this.$dom = $('body')
            this.word = word || '提示';
        }

        tipAnimationo.prototype = {
            create: function () {
                var _this = this;
                var $ele = $('<div class="tips"></div>');
                $ele.html(this.word);
                this.$dom.append($ele);
                $ele.fadeIn();
                setTimeout(function () {
                    $ele.fadeOut(function () {
                        // $ele.remove();
                        // $('.tips').remove();
                    });
                }, 2000)
            },
            start: function () {
                this.create();
            }

        };
        return tipAnimationo;
    })
