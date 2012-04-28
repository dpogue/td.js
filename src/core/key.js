/* Copyright (c) 2011 Darryl Pogue
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

define(function() {
    /**
     * Class that acts as a reference to a unique object of a fixed type.
     */
    function Key() {
        /* Private variables */
        var _type;
        var _index;
        var _name = null;

        /** The numeric class index of this key's object type. */
        Object.defineProperty(this, 'type', {
            get: function() { return _type; }
        });

        /** The index value of this key's object in the resource manager. */
        Object.defineProperty(this, 'index', {
            get: function() { return _index; }
        });

        /** The name of this key's object. */
        Object.defineProperty(this, 'name', {
            get: function() { return _name; },
            set: function(val) { _name = val; }
        });

        this.read = function(s) {
            if (typeof s.type  === 'undefined' ||
                typeof s.index === 'undefined')
            {
                console.warn('Tried to read an invalid key!');
                throw 'Invalid Key';
            }

            _type  = s.type;
            _index = s.index;

            if (typeof s.name !== 'undefined') {
                _name = s.name;
            }
        };

        this.write = function() {
            var s = {
                type: _type,
                index: _index
            };
            if (_name != null) {
                s.name = _name;
            }

            return s;
        };

        this.valid = function() {
            if (typeof _type === 'undefined') {
                return false;
            }
            if (typeof _index === 'undefined') {
                return false;
            }

            return true;
        };

        this.equals = function(other) {
            if (!(other instanceof Key)) {
                return false;
            }

            return  (this.type  === other.type) &&
                    (this.index === other.index);
        }
    }

    return Key;
});
