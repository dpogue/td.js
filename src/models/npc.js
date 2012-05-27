if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    '../core/util',
    './unit',
    '../core/resmgr'
], function (Util, Unit, mgr) {
    var obj = function() {

        var NPC = function(maxVelocity) {
            NPC._super.constructor.call(this, maxVelocity);
        };
        NPC.prototype.ClsIdx = 3;

        return NPC;
    }();
    Util.inherits(obj, Unit);
    mgr.register_class(obj);

    return obj;
});

