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

define(['./class'], function(Class) {
    /**
     * Class that acts as a reference to a unique object of a fixed type.
     *
     * @variable type The index of the object type.
     * @variable index The index of the object itself.
     * @variable name The object name (optional).
     */
    var Key = Class.extend({
        init: function() {
            this.type = null;
            this.index = null;
            this.name = null;
        },

        read: function(obj) {
            if (typeof obj.type  !== 'undefined' &&
                typeof obj.index !== 'undefined')
            {
                this.type = obj.type;
                this.index = obj.index;

                if (obj.name) {
                    this.name = obj.name;
                } else {
                    this.name = null;
                }
            } else {
                console.warn('Tried to read an invalid key!');
            }
        },

        equals: function(key) {
            if (!(key instanceof Key)) {
                return false;
            }

            return (this.type === key.type) && (this.index === key.index);
        }
    });

    return Key;
});
