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

define(['./key'], function(Key) {
    "use strict";

    // Semi-Global Static Variables

    /** An array of type constructors. */
    var _factory = [];

    /** An array of arrays of objects, keyed by type and index. */
    var _keylist = [];


    // The ResManager Object
    /** Manager to keep track of all objects, states, and types. */
    function ResManager() { }

    ResManager.prototype.register_class = function(klass) {
        if (!(klass instanceof Function)) {
            throw 'Trying to register a non-class type';
        }
        var type = klass.prototype.ClsIdx;

        if (_factory[type]) {
            console.warn('Registering with an index that is already used!');
        }

        _factory[type] = klass;
    };

    ResManager.prototype.new_object = function(type) {
        if (!_factory[type]) {
            throw 'Trying to create an object of an nonexistent type!';
        }
        var obj = new _factory[type]();
        var key = new Key();
        var idx = 0;
        if (_keylist[type]) {
            idx = _keylist[type].length;
        }
        key.read({'type': type, 'index': idx});
        obj.key = key;
        this.register_key(key, obj);
        return obj;
    };

    ResManager.prototype.add_object = function(key) {
        if (this.find(key)) {
            return;
        }

        var obj = new _factory[key.type]();
        obj.key = key;
        this.register_key(key, obj);
        return obj;
    };

    ResManager.prototype.register_key = function(key, obj) {
        if (!(key instanceof Key)) {
            throw 'Invalid key passed to ResManager.register_key!';
        }

        if (!_keylist[key.type]) {
            _keylist[key.type] = [];
        }
        _keylist[key.type][key.index] = obj;
    };

    ResManager.prototype.find = function(key) {
        if (!(key instanceof Key)) {
            throw 'Invalid key passed to ResManager.find!';
        }

        if (!_keylist[key.type]) {
            return null;
        }

        var obj = _keylist[key.type][key.index];
        if (!obj) {
            return null;
        }
        return obj;
    };

    ResManager.prototype.find_or_create = function(key) {
        var obj = this.find(key);

        if (!obj) {
            obj = this.add_object(key);
        }

        return obj;
    };

    ResManager.prototype.read = function(s) {
        if (!s.key) {
            throw "Tried to read an object without a key!";
        }

        var key = new Key();
        key.read(s.key);

        var obj = this.find_or_create(key);
        obj.read(s);
        obj.on_loaded();

        return obj;
    };

    ResManager.prototype.load = function(source) {
        if (source instanceof Array) {
            /* We got an array of objects */
            source.forEach(function(o) {
                this.read(o);
            }, this);
        } else if (source instanceof String) {
            /* We have a JSON string */
            var data = JSON.parse(source);
            if (!(data instanceof Array)) {
                throw 'Invalid JSON data';
            }
            data.forEach(function(o) {
                this.read(o);
            }, this);
        } else {
            console.error('Unknown source data passed to ResManager!');
            console.warn('Silently continuing');
        }
    };

    ResManager.prototype.game_world = function() {
        var world = [];

        this[_keylist].forEach(function(types) {
            types.forEach(function(obj) {
                world.push(obj.write());
            });
        });

        return world;
    };

    var globalResMgr = new ResManager(); /* Global Resource Manager */

    return (function() { return globalResMgr; })();
});
