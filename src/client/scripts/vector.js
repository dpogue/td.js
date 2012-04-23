define(['../../core/class'], function (Class) {
  return Class.extend({
    x: null,
    y: null,
    init: function (x, y) {
      this.x = x || 0;
      this.y = y || 0;
    },
    length: function () {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    },
    normalized: function () {
      var length = this.length();
      return {
        x: this.x / length,
        y: this.y / length
      };
    }
  });
});
