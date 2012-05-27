if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    '../core/key',
    '../core/util',
    './game_object',
    '../core/resmgr'
], function (Key, Util, GameObject, mgr) {
    var obj = function() {
        var _reloadDelay = '_tower_reload_delay',
            _radius = '_tower_radius',
            _target = '_tower_target';

        var Tower = function() {
            Tower._super.constructor.call(this);

            this[_reloadDelay] = 1;
            this[_radius] = 10;
            this[_target] = new Key();
        };
        Tower.prototype.ClsIdx = 4;

        Tower.prototype.read = function(s) {
            Tower._super.read.call(this, s);

            if ('delay' in s) {
                this[_reloadDelay] = s.delay;
            }
            if ('radius' in s) {
                this[_radius] = s.radius;
            }
            if ('target' in s) {
                this[_target].read(s.target);
            }
        };

        Tower.prototype.write = function() {
            var s = Tower._super.write.call(this);

            s.delay = this[_reloadDelay];
            s.radius = this[_radius];

            if (this[_target].valid()) {
                s.target = this[_target].write();
            }

            return s;
        };

        return Tower;
    }();
    Util.inherits(obj, GameObject);
    mgr.register_class(obj);

    return obj;
});

