if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    '../core/util',
    './game_object',
    '../core/resmgr'
], function (Util, GameObject, mgr) {
    var obj = function() {

        var Tower = function() {
            Tower._super.constructor.call(this);
        };
        Tower.prototype.ClsIdx = 4;

        return Tower;
    }();
    Util.inherits(obj, GameObject);
    mgr.register_class(obj);

    return obj;
});

