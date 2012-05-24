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

define(function (Class) {
    var Vector = function() {
        /* Private variables */
        var _x = '_vector_x',
            _y = '_vector_y',
            _length = '_vector_length',
            _length_sq = '_vector_length_sq';

        var objdef = function(x, y) {
            this[_x] = x || 0;
            this[_y] = y || 0;
        };

        Object.defineProperty(objdef.prototype, 'x', {
            get: function() { return this[_x]; },
            set: function(x) { this[_x] = x; this[_length] = null; }
        });

        Object.defineProperty(objdef.prototype, 'y', {
            get: function() { return this[_y]; },
            set: function(y) { this[_y] = y; this[_length] = null; }
        });


        Object.defineProperty(objdef.prototype, 'length', {
            get: function() {
                /* Cache the length until X or Y changes.
                 * This saves us from calling sqrt unless necessary. */
                if (this[_length] === null) {
                    this[_length] = Math.sqrt(this.lengthSq);
                }

                return this[_length];
            }
        });

        Object.defineProperty(objdef.prototype, 'lengthSq', {
            get: function() {
                if (this[_length] === null || this[_length_sq] === null) {
                    this[_length_sq] = (this[_x] * this[_x]) + (this[_y] * this[_y]);
                }

                return this[_length_sq];
            }
        });

        objdef.prototype.normalized = function() {
            var len = this.length;
            return {
                x: (this[_x] / len),
                y: (this[_y] / len)
            };
        };

        return objdef;
    }();

    return Vector;
});
