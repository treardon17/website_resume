'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Welcome = function () {
    function Welcome() {
        _classCallCheck(this, Welcome);

        this.blinking = false;
        this.element = $('.welcome')[0];
        this.writer = '#welcome-message-1';
        this.welcomeNavs = $(this.element).find('.welcome-nav');
        this.welcomeNavButtons = $(this.element).find('.welcome-nav-button');
        this.writeToScreen(this.writer);
    }

    _createClass(Welcome, [{
        key: 'writeToScreen',
        value: function writeToScreen(writer) {
            var _this = this;

            this.startCursorBlink({ writer: writer, timeBetweenBlinks: 700 });
            this.writeAndRemoveWordArray({ writer: writer, array: ['Hi there', 'I\'m Tyler Reardon'], timeBetweenWords: 2000, timeBetweenLetters: 250, callback: function callback() {
                    _this.stopCursorBlink();
                    _this.expandWelcome();
                }
            });
        }
    }, {
        key: 'expandWelcome',
        value: function expandWelcome() {
            $(this.writer).addClass('welcome-expanded');
            $(this.welcomeNavs).addClass('welcome-nav-expanded');
            $(this.welcomeNavButtons).addClass('welcome-nav-button-visible');
        }
    }, {
        key: 'contractWelcome',
        value: function contractWelcome() {
            $(this.writer).removeClass('welcome-expanded');
            $(this.welcomeNavs).removeClass('welcome-nav-expanded');
            $(this.welcomeNavButtons).removeClass('welcome-nav-button-visible');
        }
    }, {
        key: 'startCursorBlink',
        value: function startCursorBlink() {
            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { writer: null, timeBetweenBlinks: 0 };

            this.blinking = true;
            this.blinkCursorRepeat({ writer: pObject.writer, timeBetweenBlinks: pObject.timeBetweenBlinks });
        }
    }, {
        key: 'stopCursorBlink',
        value: function stopCursorBlink() {
            this.blinking = false;
        }
    }, {
        key: 'blinkCursorRepeat',
        value: function blinkCursorRepeat() {
            var _this2 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { writer: null, timeBetweenBlinks: 0 };

            if (this.blinking) {
                this.blinkCursor({ writer: pObject.writer, timeBetweenBlinks: pObject.timeBetweenBlinks, callback: function callback() {
                        setTimeout(function () {
                            _this2.blinkCursorRepeat({ writer: pObject.writer, timeBetweenBlinks: pObject.timeBetweenBlinks });
                        }, pObject.timeBetweenBlinks);
                    } });
            }
        }
    }, {
        key: 'blinkCursor',
        value: function blinkCursor() {
            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { writer: null, timeBetweenBlinks: 0, callback: function callback() {} };

            $(pObject.writer).addClass('cursor-on');
            setTimeout(function () {
                $(pObject.writer).removeClass('cursor-on');
                if (typeof pObject.callback === 'function') {
                    pObject.callback();
                }
            }, pObject.timeBetweenBlinks);
        }
    }, {
        key: 'writeAndRemoveWordArray',
        value: function writeAndRemoveWordArray() {
            var _this3 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { writer: null, array: [], timeBetweenWords: 0, timeBetweenLetters: 0, callback: function callback() {} };

            if (pObject.array.length == 0) {
                if (typeof pObject.callback === 'function') {
                    pObject.callback();
                }
                return;
            }

            this.writeAndRemoveWord({ writer: pObject.writer, word: pObject.array[0], timeBetweenLetters: pObject.timeBetweenLetters, timeBetweenWords: pObject.timeBetweenWords, callback: function callback() {
                    var slicedArray = pObject.array.slice(1, pObject.array.length);
                    _this3.writeAndRemoveWordArray({ writer: pObject.writer, array: slicedArray, timeBetweenWords: pObject.timeBetweenWords, timeBetweenLetters: pObject.timeBetweenLetters, callback: pObject.callback });
                } });
        }
    }, {
        key: 'writeAndRemoveWord',
        value: function writeAndRemoveWord() {
            var _this4 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { writer: null, word: '', timeBetweenLetters: 0, timeBetweenWords: 0, callback: function callback() {} };

            this.writeWordTowriter({ writer: pObject.writer, word: pObject.word, timeBetween: pObject.timeBetweenLetters * (2 / 3), callback: function callback() {
                    setTimeout(function () {
                        _this4.removeWordFromwriter({ writer: pObject.writer, timeBetween: pObject.timeBetweenLetters * (1 / 3), callback: pObject.callback });
                    }, pObject.timeBetweenWords);
                } });
        }
    }, {
        key: 'writeWordTowriter',
        value: function writeWordTowriter() {
            var _this5 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { writer: null, word: '', timeBetween: 0, callback: function callback() {} };

            var writer = $(pObject.writer);
            var word = pObject.word;
            if (writer === null || word === null || word === '') return;

            var _loop = function _loop(i) {
                var partial = word.slice(0, i + 1);
                setTimeout(function () {
                    $(writer).text(partial);
                    if (_this5.blinking) {
                        $(writer).addClass('cursor-on');
                    }
                }, pObject.timeBetween * i);
            };

            for (var i = 0; i < word.length; i++) {
                _loop(i);
            }

            if (typeof pObject.callback === 'function') {
                setTimeout(function () {
                    pObject.callback();
                }, pObject.timeBetween * word.length);
            }
        }
    }, {
        key: 'removeWordFromwriter',
        value: function removeWordFromwriter() {
            var _this6 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { writer: null, timeBetween: 0, callback: function callback() {} };

            var writer = $(pObject.writer);
            if (writer === null) return;

            var word = $(writer).text();

            var _loop2 = function _loop2(i) {
                var partial = word.slice(0, i);
                setTimeout(function () {
                    $(writer).text(partial);
                    if (_this6.blinking) {
                        $(writer).addClass('cursor-on');
                    }
                }, pObject.timeBetween * (word.length - i));
            };

            for (var i = word.length; i >= 0; i--) {
                _loop2(i);
            }

            if (typeof pObject.callback === 'function') {
                setTimeout(function () {
                    pObject.callback();
                }, pObject.timeBetween * word.length);
            }
        }
    }]);

    return Welcome;
}();

$(document).ready(function () {
    var welcome = new Welcome();
});