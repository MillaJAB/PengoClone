var canvas, canvasContext;
var greenPlayer = new playerClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, "black");
	colorText("Loading Images", canvas.width/2, canvas.height/2, "white");

	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();
	
	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	worldGrid = whichLevel.slice(); // Copies levelOne grid to the empty world grid
	greenPlayer.reset(playerPic, "Sabot Keenblade");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	greenPlayer.move();
}
	
function drawAll() {
	drawWorlds();
	greenPlayer.draw();
}