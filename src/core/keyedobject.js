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

define(['./class', './key'], function(Class, Key) {
    var classdef = function() {
        /* Private variables */
        var _key = new Key();
        var _loaded;


        return {
            init: function() {
                /* The unique key that identifies this object. */
                Object.defineProperty(this, 'key', {
                    get: function() { return _key; },
                    set: function(key) {
                        _key.read(key);
                    }
                });

                /* Boolean indicating whether the object has been loaded. */
                Object.defineProperty(this, 'loaded', {
                    get: function() { return _loaded; }
                });

                /* The object's name (wrapper for key.name). */
                Object.defineProperty(this, 'name', {
                    get: function() { return _key.name; },
                    set: function(val) { _key.name = val; }
                });
            },

            on_loaded: function() {
                _loaded = true;
            },

            read: function(s) {
                if (typeof s.key === 'undefined') {
                    throw 'Tried to read an object without a key!';
                }

                var newkey = new Key();
                newkey.read(s.key);

                if (_key.valid() && !_key.equals(newkey)) {
                    throw 'Tried to change the key of an object!';
                }

                this.key = newkey;
            }
        };
    };

    var KeyedObject = Class.extend(classdef());
    return KeyedObject;
});
