if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}


function initializeField(ctx, texture, canvas) {
	ctx.save();
	// draw the bg
	ctx.drawImage(texture,
			0,
			0,
			texture.width,
			texture.height,
			texture.width,
			texture.height * -1,
			texture.width,
			texture.height);
	ctx.restore();
	// actually draw it to the screen
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
