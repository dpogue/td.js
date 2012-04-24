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

    /**
     * Singleton that manages all the objects and object types.
     * @variable factory An array of type constructors.
     * @variable keys An array of arrays of objects, keyed by type and index.
     */
    var ResManager = Class.extend({
        init: function() {
            this.factory = [];
            this.keylist = [];
        },

        register_class: function(klass) {
            if (!(klass instanceof Function)) {
                throw 'Trying to register a non-class type';
            }
            type = klass.prototype.ClsIdx;

            if (this.factory[type]) {
                console.warn('Registering with an index that is already used!');
            }

            this.factory[type] = klass;
        },

        new_object: function(type) {
            if (!this.factory[type]) {
                throw 'Trying to create an object of an nonexistent type!';
            }
            var obj = new this.factory[type]();
            var key = new Key();
            var idx = 0;
            if (this.keylist[type]) {
                idx = this.keylist[type].length;
            }
            key.read({'type': type, 'index': idx});
            obj.key = key;
            this.register_key(key, obj);
            return obj;
        },

        add_object: function(key) {
            if (this.find(key)) {
                return;
            }

            var obj = new this.factory[key.type]();
            obj.key = key;
            this.register_key(key, obj);
            return obj;
        },

        register_key: function(key, obj) {
            if (!(key instanceof Key)) {
                throw 'Invalid key passed to ResManager.register_key!';
            }

            if (!this.keylist[key.type]) {
                this.keylist[key.type] = [];
            }
            this.keylist[key.type][key.index] = obj;
        },

        find: function(key) {
            if (!(key instanceof Key)) {
                throw 'Invalid key passed to ResManager.find!';
            }

            if (!this.keylist[key.type]) {
                return null;
            }

            var obj = this.keylist[key.type][key.index];
            if (!obj) {
                return null;
            }
            return obj;
        },

        find_or_create: function(key) {
            var obj = this.find(key);

            if (!obj) {
                obj = this.add_object(key);
            }

            return obj;
        },

        read: function(data) {
            if (!data.key) {
                throw "Tried to read an object without a key!";
            }

            var key = new Key();
            key.read(data.key);

            var obj = this.find_or_create(key);
            obj.read(data);
            obj.on_loaded();

            return obj;
        },

        load: function(source) {
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
        }
    });

    var globalResMgr = new ResManager(); /* Global Resource Manager */

    return (function() { return globalResMgr; })();
});
