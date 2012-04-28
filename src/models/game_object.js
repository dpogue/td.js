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

define(['../core/keyedobject', '../core/resmgr'], function(KeyedObject, mgr) {

    var classdef = function() {
        var _posX = 0;
        var _posY = 0;
        var _rotation = 0;
        var _scale = 1.0;

        return {
            ClsIdx: 0,

            init: function() {
                this._super();

                /** An array of the object's X/Y position. */
                Object.defineProperty(this, 'position', {
                    get: function() { return [_posX, _posY]; }
                });
                /** The object's X position. */
                Object.defineProperty(this, 'position_x', {
                    get: function() { return _posX; }
                });
                /** The object's Y position. */
                Object.defineProperty(this, 'position_y', {
                    get: function() { return _posY; }
                });
                /** The object's rotation in degrees (from east). */
                Object.defineProperty(this, 'rotation', {
                    get: function() { return _rotation; }
                });
                /** The scale of the game object. (Do we need separate X/Y?) */
                Object.defineProperty(this, 'scale', {
                    get: function() { return _scale; }
                });
            },

            read: function(s) {
                this._super(s);

                if ('x' in s) {
                    _posX = s.x;
                }
                if ('y' in s) {
                    _posY = s.y;
                }
                if ('r' in s) {
                    _rotation = s.r;
                }
                if ('s' in s) {
                    _scale = s.s;
                }
            },

            write: function() {
                var s = this._super();

                s.x = _posX;
                s.y = _posY;
                s.r = _rotation;
                s.s = _scale;

                return s;
            }
        };
    };

    var GameObject = KeyedObject.extend(classdef());
    mgr.register_class(GameObject);
    return GameObject;
});
