/* putting the canvas here because it's a client thingy */
/* I am a bad JS programmer */
var bgcanvas = document.getElementById('bg');
var bgctx = bgcanvas.getContext('2d');
bgcanvas.width = document.body.clientWidth;
bgcanvas.height = document.body.clientHeight;


var texture = new Image();
texture.src = '/client/img/squareTexture.png'
initializeField(bgctx, texture, bgcanvas);

