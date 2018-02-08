var canvas, canvasContext;
var player = new playerClass();
var enemy = new enemyClass();

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
	player.reset(playerPic, "Sabot Keenblade");
	enemy.reset(enemyPic, "Key of Doom");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	player.move();
	enemy.move();
}
	
function drawAll() {
	drawWorlds();
	player.draw();
	enemy.draw();
}