define(["src/models/unit", '../browser_helper'], function(Unit, Helper) {

    Unit.prototype.on_loaded = function() {
        if (!this.loaded) {
            this.initDiv('magenta');
        }

        Unit._super.on_loaded.call(this);
    };

    Unit.prototype.initDiv = function(color) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.key);
        this.container.setAttribute('class', 'unit');
        this.container.style["backgroundColor"] = color;
        document.body.appendChild(this.container);

        return this;
    };

    Unit.prototype.move = function () {
        var translate = 'translate3d(' + this.position_x + 'px, ' + this.position_y + 'px, 0)',
            rotate = 'rotate(' + this.rotation + 'deg)';

        if (Helper.transform[0] === 'O') {
            translate = 'translate(' + this.position_x + 'px, ' + this.position_y + 'px)';
        }

        this.container.style[Helper.transform] = translate + " " + rotate;
    };

    return Unit;
});

