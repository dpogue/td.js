var bgcanvas = document.getElementById('bg');
var bgctx = canvas.getContext('2d');
bgcanvas.width = document.body.clientWidth;
bgcanvas.height = document.body.clientHeight;

var texture = new Image();
texture.src = '/img/squareTexture.png'

function initializeField() {
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
