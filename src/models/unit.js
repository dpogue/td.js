if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    '../core/util',
    './game_object',
    '../core/resmgr',
    '../core/vector'
], function (Util, GameObject, mgr, Vector) {
    //"use strict";

    var Unit = function() {
        var _accel = '_unit_accel',
            _decel = '_unit_decel',
            _maxVelocity = '_unit_maxvelocity',
            _force = '_unit_force',
            _velocity = '_unit_velocity';

        var objdef = function (maxVelocity) {
            objdef._super.constructor.call(this);

            this[_accel] = 0.3;
            this[_decel] = 0.6;
            this[_maxVelocity] = maxVelocity || 5;
            this[_force] = new Vector();
            this[_velocity] = new Vector();
        };

        objdef.prototype.ClsIdx = 1;

        /** Unit's acceleration. */
        Object.defineProperty(objdef.prototype, 'accel', {
            get: function () { return this[_accel]; }
        });
        /** Unit's decceleration. */
        Object.defineProperty(objdef.prototype, 'decel', {
            get: function () { return this[_decel]; }
        });
        /** Unit's maximum velocity. */
        Object.defineProperty(objdef.prototype, 'maxVelocity', {
            get: function () { return this[_maxVelocity]; }
        });

        /** Force currently acting on unit. */
        Object.defineProperty(objdef.prototype, 'force', {
            get: function () { return new Vector(this[_force].x, this[_force].y); },
            set: function (force) {
                // this[_force].x = force.x;
                // this[_force].y = force.y;
                this[_force] = force;
            }
        });

        /** Unit's current velocity. */
        Object.defineProperty(objdef.prototype, 'velocity', {
            get: function () { return new Vector(this[_velocity].x, this[_velocity].y); },
            set: function (velocity) {
                this[_velocity].x = velocity.x;
                this[_velocity].y = velocity.y;
            }
        });

        // Overridden.
        objdef.prototype.read = function(s) {
            objdef._super.read.call(this, s);

            if ('accel' in s) {
                this[_accel] = s.accel;
            }
            if ('decel' in s) {
                this[_decel] = s.decel;
            }
            if ('maxVelocity' in s) {
                this[_maxVelocity] = s.maxVelocity;
            }
            if ('force' in s) {
                this[_force].x = s.force.x;
                this[_force].y = s.force.y;
            }
            if ('velocity' in s) {
                this[_velocity].x = s.velocity.x;
                this[_velocity].y = s.velocity.y;
            }
        };

        // Overridden.
        objdef.prototype.write = function() {
            var s = objdef._super.write.call(this);

            s.accel = this[_accel];
            s.decel = this[_decel];
            s.maxVelocity = this[_maxVelocity];
            s.force = {
                x: this[_force].x,
                y: this[_force].y
            };
            s.velocity = {
                x: this[_velocity].x,
                y: this[_velocity].y
            };

            return s;
        };

        objdef.prototype.update = function () {
            // if (((this[_velocity].lengthSq | 0) === 0) && ((this[_force].lengthSq | 0) === 0))
            //     return;

            this.applyForce();
            this.applyDirection();
            this.applyVelocity();
        };

        objdef.prototype.applyForce = function () {
            var force = this[_force],
                temp_vector = this.velocity,
                vector = new Vector(force.x * temp_vector.x, force.y * temp_vector.y);

            if (vector.x >= 0) {
                temp_vector.x = force.x * this.accel + temp_vector.x;
            } else {
                temp_vector.x = force.x * (this.accel + this.decel) + temp_vector.x;
            }

            if (vector.y >= 0) {
                temp_vector.y = force.y * this.accel + temp_vector.y;
            } else {
                temp_vector.y = force.y * (this.accel + this.decel) + temp_vector.y;
            }

            // TODO: We never completely reach this.maxVelocity.
            if (temp_vector.length >= this.maxVelocity) {
                temp_vector = temp_vector.normalized();
                temp_vector.x *= this[_maxVelocity];
                temp_vector.y *= this[_maxVelocity];
            }

            if (force.x === 0) {
                // deceleration towards 0
                var vel_x = temp_vector.x;
                if (vel_x > 0) {
                    if ((vel_x - this.decel) < 0) {
                        temp_vector.x = 0;
                    } else {
                        temp_vector.x = vel_x - this.decel;
                    }
                }
                else if (vel_x < 0) {
                    if ((vel_x + this.decel) > 0) {
                        temp_vector.x = 0;
                    } else {
                        temp_vector.x = vel_x + this.decel;
                    }
                }
            }

            if (force.y === 0) {
                // deceleration towards 0
                var vel_y = temp_vector.y;
                if (vel_y > 0) {
                    if ((vel_y - this.decel) < 0) {
                        temp_vector.y = 0;
                    } else {
                        temp_vector.y = vel_y - this.decel;
                    }
                }
                else if (vel_y < 0) {
                    if ((vel_y + this.decel) > 0) {
                        temp_vector.y = 0;
                    } else {
                        temp_vector.y = vel_y + this.decel;
                    }
                }
            }

            this.velocity = temp_vector;
        };

        objdef.prototype.applyVelocity = function () {
            var changeX = this[_velocity].x;
            var changeY = this[_velocity].y;

            if ((changeX | 0) === 0 && (changeY | 0) === 0)
                return;

            this.position_x = this.position_x + changeX;
            this.position_y = this.position_y + changeY;

            this.move();
        };

        objdef.prototype.applyDirection = function () {
            var angle = 0;
            var degree = 0;
            var vel_x = this[_velocity].x;
            var vel_y = this[_velocity].y;

            if ((vel_x | 0) === 0 && (vel_y | 0) === 0) {
                return;
            }

            var abs_x = (vel_x ^ (vel_x >> 31)) - (vel_x >> 31);
            var abs_y = (vel_y ^ (vel_y >> 31)) - (vel_y >> 31);

            if (abs_x >= abs_y) {
                angle = Math.atan(vel_y / vel_x) * (180 / Math.PI);

                if (vel_x > 0) {
                    // "E"
                    if (vel_y === 0) {
                        degree = 0;
                    }
                    // "SE"
                    else if (vel_x === vel_y) {
                        degree = 45;
                    }
                    // "NE"
                    else if (vel_x === (-vel_y)) {
                        degree = 315;
                    }

                    else if (angle < 0) {
                        degree = (+angle);
                    }

                    else {
                        degree = 360 + angle;
                    }
                } else if (vel_x < 0) {
                    // "W"
                    if (vel_y === 0) {
                        degree = 180;
                    }
                    // "NW"
                    else if (vel_x === vel_y) {
                        degree = 225;
                    }
                    // "SW"
                    else if (vel_x === (-vel_y)) {
                        degree = 135;
                    }

                    else {
                        degree = 180 + angle;
                    }
                }
            } else if (abs_y > abs_x) {
                angle = Math.atan(vel_x / vel_y) * (180 / Math.PI);

                if (vel_y < 0) {
                    if (vel_x === 0) {
                        degree = 270;
                    } else {
                        degree = 270 - angle;
                    }
                } else if (vel_y > 0) {
                    if (vel_x === 0) {
                        degree = 90;
                    } else {
                        degree = 90 - angle;
                    }
                }
            }

            if (this.rotation != degree) {
                this.rotation = degree;
            }
        };

        return objdef;
    }();
    Util.inherits(Unit, GameObject);
    mgr.register_class(Unit);

    return Unit;
});
