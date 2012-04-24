/* Copyright (c) 2012 Tom Nightingale
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./class'], function (Class) {
    var classdef = function() {
        /* Private variables */
        var _x = 0;
        var _y = 0;
        var _length = null;

        return {
            init: function(x, y) {
                _x = x || 0;
                _y = y || 0;

                Object.defineProperty(this, 'x', {
                    get: function() { return _x; },
                    set: function(x) { _x = x; _length = null; }
                });

                Object.defineProperty(this, 'y', {
                    get: function() { return _y; },
                    set: function(y) { _y = y; _length = null; }
                });
            },

            length: function() {
                /* Cache the length until X or Y changes.
                 * This saves us from calling sqrt unless necessary. */
                if (_length === null) {
                    _length = Math.sqrt((_x * _x) + (_y * _y));
                }

                return _length;
            },

            normalized: function() {
                var len = this.length();
                return {
                    x: (_x / len),
                    y: (_y / len)
                };
            }
        };
    };

    var Vector = Class.extend(classdef());
    return Vector;
});
