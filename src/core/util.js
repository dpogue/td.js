/**
 * Utility functions.
 * To be used when a native equivalent is not available (eg:
 * utilities.inherits() in node.js).
 *
 * TODO: Properly namespace these.
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function() {
    /**
     *
     */
    var extend = function extend (target, source) {
      Object.getOwnPropertyNames(source).forEach(function(propName) {
        Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
      });
      return target;
    };

    /**
     *
     */
    var inherits = (function () {
      // Use node's util.inherits().
      if (typeof module !== 'undefined' && module.exports) {
        return require('util').inherits;
      }
      // Otherwise define our own.
      // TODO: Ensure this implementation matches node's.
      else {
        return function inherits(SubC, SuperC) {
          var subProto = Object.create(SuperC.prototype);
          // At the very least, we keep the "constructor" property
          // At most, we keep additions that have already been made
          extend(subProto, SubC.prototype);
          SubC.prototype = subProto;
          SubC._super = SuperC.prototype;

          return SubC;
        };
      }
    }());

    return {
        extend: extend,
        inherits: inherits
    };
});

/**
 * Example object definitions.
 */

/*

// Base object.
var A = function () {
  var greeting = '_a_greeting',
      subject = '_a_subject';

  // Constructor
  var objdef = function (newGreeting, newSubject) {
    this[greeting] = newGreeting || "hello";
    this[subject] = newSubject || "world";
  };

  // Public descriptors (Getters/Setters)
  Object.defineProperty(objdef.prototype, 'subject', {
    get: function () {
      return this[subject];
    },
    set: function (newSubject) {
      this[subject] = newSubject;
    }
  });

  // Public 'priviliged' methods.
  objdef.prototype.greet = function () {
    return this[greeting] + " " + this[subject];
  };

  return objdef;
}();

// B inherits from A.
var B = function () {
  var leaving = '_b_leaving';

  // Constructor.
  var objdef = function (newGreeting, newSubject, newLeaving) {
    objdef._super.constructor.call(this, newGreeting, newSubject);
    this[leaving] = newLeaving || "goodbye";
  };

  // Overriding greet().
  objdef.prototype.greet = function () {
    return objdef._super.greet.call(this) + ", how are you?";
  };

  // Parent properties (subject) must have a 'get' descriptor to be referenced.
  objdef.prototype.leave = function () {
    return this[leaving] + " " + this.subject;
  };

  return objdef;
}();
inherits(B, A);

// Experimental syntax for inherits (using annonymous function).
var C = inherits(function () {
  var objdef = function () {
    objdef._super.constructor.call(this);
  };
  return objdef;
}(), B);



// Usage
var a = new A();
var b = new B();
var c = new C();

console.log(a);
console.log(a.greet());    // "hello world"
// console.log(a.leave()); // TypeError

console.log(b);
console.log(b.greet());    // "hello world, how are you?"

b.subject = "Tom";
console.log(a.subject);    // "world"

console.log(b.leave());    // "goodbye Tom"
*/
