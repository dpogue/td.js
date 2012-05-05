define(["src/models/unit", 'src/client/stats'], function(Unit, Stats) {

    Unit.prototype.initDiv = function(color) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.key);
        this.container.setAttribute('class', 'unit');
        this.container.style["background-color"] = color;
        document.body.appendChild(this.container);
        return this;
    };

    Unit.prototype.move = function () {
        var translate = 'translate3d(' + this.position_x + 'px, ' + this.position_y + 'px, 0) ';
            rotate = 'rotate(' + this.rotation + 'deg)';

        this.container.style.webkitTransform = translate + " " + rotate;
    };

    return Unit;
});

