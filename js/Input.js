const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	greenPlayer.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(keyEvent, whichPlayer, setTo) {
	if (keyEvent.keyCode == whichPlayer.controlKeyLeft) {
		whichPlayer.keyHeld_TurnLeft = setTo;
	}
	if (keyEvent.keyCode == whichPlayer.controlKeyRight) {
		whichPlayer.keyHeld_TurnRight = setTo;
	}
	if (keyEvent.keyCode == whichPlayer.controlKeyUp) {
		whichPlayer.keyHeld_Gas = setTo;
	}
	if (keyEvent.keyCode == whichPlayer.controlKeyDown) {
		whichPlayer.keyHeld_Reverse = setTo;
	}
}

function keyPressed(evt) {
	//console.log("Key pressed: " + evt.keyCode);
	keySet(evt, greenPlayer, true);
}

function keyReleased(evt) {
	keySet(evt, greenPlayer, false);
	// console.log("Key released: " + evt.keyCode);
}