define(["src/models/tower", '../browser_helper'], function(Tower, Helper) {

    Tower.prototype.initElement = function() {
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.key);
        this.container.setAttribute('class', 'tower');
        this.container.style["backgroundColor"] = 'grey';
        document.body.appendChild(this.container);

        return this;
    };

    return Tower;
});
