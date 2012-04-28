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

define(['../core/util', '../core/keyedobject', '../core/resmgr'], function(Util, KeyedObject, mgr) {

    var GameObject = function() {
        var _posX = '_gameobject_posx',
            _posY = '_gameobject_posy',
            _rotation = '_gameobject_rotation',
            _scale = '_gameobject_scale';

        var objdef = function() {
            objdef._super.constructor.call(this);
        };

        objdef.prototype.ClsIdx = 0;

        /** An array of the object's X/Y position. */
        Object.defineProperty(objdef.prototype, 'position', {
            get: function() { return [this[_posX], this[_posY]]; }
        });
        /** The object's X position. */
        Object.defineProperty(objdef.prototype, 'position_x', {
            get: function() { return this[_posX]; },
            set: function(posX) { this[_posX] = posX; }
        });
        /** The object's Y position. */
        Object.defineProperty(objdef.prototype, 'position_y', {
            get: function() { return this[_posY]; },
            set: function(posY) { this[_posY] = posY; }
        });
        /** The object's rotation in degrees (from east). */
        Object.defineProperty(objdef.prototype, 'rotation', {
            get: function() { return this[_rotation]; },
            set: function(degree) { this[_rotation] = degree; }
        });
        /** The scale of the game object. (Do we need separate X/Y?) */
        Object.defineProperty(objdef.prototype, 'scale', {
            get: function() { return this[_scale]; }
        });

        // Overridden.
        objdef.prototype.read = function(s) {
            this._super.read.call(this, s);

            if ('x' in s) {
                this[_posX] = s.x;
            }
            if ('y' in s) {
                this[_posY] = s.y;
            }
            if ('r' in s) {
                this[_rotation] = s.r;
            }
            if ('s' in s) {
                this[_scale] = s.s;
            }
        };
        
        return objdef;
    }();

    Util.inherits(GameObject, KeyedObject);
    mgr.register_class(GameObject);

    return GameObject;
});
