const PLAYER_SPEED = 5;
var keysOwned = 0;

function playerClass() {

	this.x = 75;
	this.y = 75;
	this.myPlayerPic; // which picture to use
	this.name = "Untitled Player";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) { // use this different notation when the function is a part of a class
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, playerName) {
		this.name = playerName;
		this.myPlayerPic = whichImage;

		for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
			for(var eachCol=0; eachCol<TILE_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (worldGrid[arrayIndex] == PLAYERSTART) {
					worldGrid[arrayIndex] = GROUND;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of playerReset func

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if (this.keyHeld_Gas) {
			nextY -= PLAYER_SPEED;
		}
		if (this.keyHeld_Reverse) {
			nextY += PLAYER_SPEED;
		}
		
		if (this.keyHeld_TurnLeft) {
			nextX -= PLAYER_SPEED;
		}
		if (this.keyHeld_TurnRight) {
			nextX += PLAYER_SPEED;
		}

		var walkIntoTileIndex = getTileType(nextX, nextY);

		if (walkIntoTileIndex == CHALICE) {
			console.log(greenPlayer.name + " You WIN. Good jerb.");
			loadLevel(levelOne);	
		} else if (walkIntoTileIndex == GROUND  ) { // Only moves if there's ground ahead
			this.x = nextX;
			this.y = nextY;	
		} else if (walkIntoTileIndex == KEY) {
			worldGrid[giveIndexForObstacle(this.x, this.y, nextX, nextY)] = GROUND;
			drawWorlds();
			keysOwned++;
			console.log("You have " + keysOwned);
		} else if (walkIntoTileIndex == DOOR) {
			if (keysOwned > 0) {
				worldGrid[giveIndexForObstacle(this.x, this.y, nextX, nextY)] = GROUND;
				keysOwned--;
				console.log("You have " + keysOwned);
			}
		}
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myPlayerPic, this.x, this.y, this.ang);
	}
}

function giveIndexForObstacle(currentX, currentY, nextX, nextY) {
	var col;
	var row;
	if (nextX > currentX) { // moving right
		col = Math.floor((currentX + TILE_W/2) / TILE_W);
		row = Math.floor(currentY / TILE_H);
	} else if (nextX < currentX) { // moving left
		col = Math.floor((currentX - TILE_W/2) / TILE_W);
		row = Math.floor(currentY / TILE_H);
	} else if (nextY < currentY) { // moving up
		col = Math.floor(currentX / TILE_W);
		row = Math.floor((currentY - TILE_H) / TILE_H);
	} else { // moving down
		col = Math.floor(currentX / TILE_W);
		row = Math.floor((currentY + TILE_H/2) / TILE_H);
	} 
	return (row * TILE_COLS + col);
}

// BUG: When going diagonal, multiple keys get picked up
// BUG: A wall got removed at one point instead of the door
// BUG: Need to reset number of keys owned to zero on reset
