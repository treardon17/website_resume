'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Welcome = function () {
    function Welcome() {
        _classCallCheck(this, Welcome);

        this.blinking = false;
        this.writeToScreen();
    }

    _createClass(Welcome, [{
        key: 'writeToScreen',
        value: function writeToScreen() {
            var _this = this;

            var element = '#welcome-message-1';
            this.startCursorBlink({ element: element, timeBetweenBlinks: 700 });
            this.writeAndRemoveWordArray({ element: element, array: ['Hi there', 'I\'m Tyler Reardon'], timeBetweenWords: 2000, timeBetweenLetters: 250, callback: function callback() {
                    _this.stopCursorBlink();
                    _this.expandWelcome({ element: element });
                }
            });
        }
    }, {
        key: 'expandWelcome',
        value: function expandWelcome() {
            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null };

            $(pObject.element).addClass('welcome-expanded');
        }
    }, {
        key: 'contractWelcome',
        value: function contractWelcome() {
            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null };

            $(pObject.element).removeClass('welcome-expanded');
        }
    }, {
        key: 'startCursorBlink',
        value: function startCursorBlink() {
            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null, timeBetweenBlinks: 0 };

            this.blinking = true;
            this.blinkCursorRepeat({ element: pObject.element, timeBetweenBlinks: pObject.timeBetweenBlinks });
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

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null, timeBetweenBlinks: 0 };

            if (this.blinking) {
                this.blinkCursor({ element: pObject.element, timeBetweenBlinks: pObject.timeBetweenBlinks, callback: function callback() {
                        setTimeout(function () {
                            _this2.blinkCursorRepeat({ element: pObject.element, timeBetweenBlinks: pObject.timeBetweenBlinks });
                        }, pObject.timeBetweenBlinks);
                    } });
            }
        }
    }, {
        key: 'blinkCursor',
        value: function blinkCursor() {
            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null, timeBetweenBlinks: 0, callback: function callback() {} };

            $(pObject.element).addClass('cursor-on');
            setTimeout(function () {
                $(pObject.element).removeClass('cursor-on');
                if (typeof pObject.callback === 'function') {
                    pObject.callback();
                }
            }, pObject.timeBetweenBlinks);
        }
    }, {
        key: 'writeAndRemoveWordArray',
        value: function writeAndRemoveWordArray() {
            var _this3 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null, array: [], timeBetweenWords: 0, timeBetweenLetters: 0, callback: function callback() {} };

            if (pObject.array.length == 0) {
                if (typeof pObject.callback === 'function') {
                    pObject.callback();
                }
                return;
            }

            this.writeAndRemoveWord({ element: pObject.element, word: pObject.array[0], timeBetweenLetters: pObject.timeBetweenLetters, timeBetweenWords: pObject.timeBetweenWords, callback: function callback() {
                    var slicedArray = pObject.array.slice(1, pObject.array.length);
                    _this3.writeAndRemoveWordArray({ element: pObject.element, array: slicedArray, timeBetweenWords: pObject.timeBetweenWords, timeBetweenLetters: pObject.timeBetweenLetters, callback: pObject.callback });
                } });
        }
    }, {
        key: 'writeAndRemoveWord',
        value: function writeAndRemoveWord() {
            var _this4 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null, word: '', timeBetweenLetters: 0, timeBetweenWords: 0, callback: function callback() {} };

            this.writeWordToElement({ element: pObject.element, word: pObject.word, timeBetween: pObject.timeBetweenLetters * (2 / 3), callback: function callback() {
                    setTimeout(function () {
                        _this4.removeWordFromElement({ element: pObject.element, timeBetween: pObject.timeBetweenLetters * (1 / 3), callback: pObject.callback });
                    }, pObject.timeBetweenWords);
                } });
        }
    }, {
        key: 'writeWordToElement',
        value: function writeWordToElement() {
            var _this5 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null, word: '', timeBetween: 0, callback: function callback() {} };

            var element = $(pObject.element);
            var word = pObject.word;
            if (element === null || word === null || word === '') return;

            var _loop = function _loop(i) {
                var partial = word.slice(0, i + 1);
                setTimeout(function () {
                    $(element).text(partial);
                    if (_this5.blinking) {
                        $(element).addClass('cursor-on');
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
        key: 'removeWordFromElement',
        value: function removeWordFromElement() {
            var _this6 = this;

            var pObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: null, timeBetween: 0, callback: function callback() {} };

            var element = $(pObject.element);
            if (element === null) return;

            var word = $(element).text();

            var _loop2 = function _loop2(i) {
                var partial = word.slice(0, i);
                setTimeout(function () {
                    $(element).text(partial);
                    if (_this6.blinking) {
                        $(element).addClass('cursor-on');
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