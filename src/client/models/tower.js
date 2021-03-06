define(["src/models/tower", '../browser_helper'], function(Tower, Helper) {

    Tower.prototype.on_loaded = function() {
        Tower._super.on_loaded.call(this);

        this.initElement();
    };

    Tower.prototype.initElement = function() {
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.key);
        this.container.setAttribute('class', 'tower');
        this.container.style["backgroundColor"] = 'grey';

        var translate = 'translate3d(' + this.position_x + 'px, ' + this.position_y + 'px, 0)';
        if (Helper.transform[0] === 'O') {
            translate = 'translate(' + this.position_x + 'px, ' + this.position_y + 'px)';
        }
        this.container.style[Helper.transform] = translate;

        document.body.appendChild(this.container);

        return this;
    };

    return Tower;
});
