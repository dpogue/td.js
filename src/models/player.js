if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    '../core/util',
    './unit',
    '../core/resmgr'
], function (Util, Unit, mgr) {
    var obj = function() {
        var _nickname = '_player_nickname';

        var Player = function(nickname) {
            Player._super.constructor.call(this, 5);

            this[_nickname] = nickname;
        };
        Player.prototype.ClsIdx = 2;

        /** Player's name. */
        Object.defineProperty(Player.prototype, 'nickname', {
            get: function () { return this[_nickname]; }
        });

        return Player;
    }();
    Util.inherits(obj, Unit);
    mgr.register_class(obj);

    return obj;
});
