const PLAYER_SPEED = 5;
var keysOwned = 0;
var pushAllowed = false;
var directionAugment = 0;

function playerClass() {

	this.x = 75;
	this.y = 75;
	this.myPlayerPic; // which picture to use
	this.name = "Untitled Player";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;
	this.keyHeld_Push = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;
	this.controlKeySpace

	this.setupInput = function(upKey, rightKey, downKey, leftKey, spaceKey) { // use this different notation when the function is a part of a class
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
		this.controlKeySpace = spaceKey;
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
			directionAugment = -TILE_COLS;
		}
		if (this.keyHeld_Reverse) {
			nextY += PLAYER_SPEED;
			directionAugment = TILE_COLS;
		}
		
		if (this.keyHeld_TurnLeft) {
			nextX -= PLAYER_SPEED;
			directionAugment = -1;
		}
		if (this.keyHeld_TurnRight) {
			nextX += PLAYER_SPEED;
			directionAugment = 1;
		}
		var walkIntoTileIndex = getTileType(nextX, nextY);

		//this.x = senseCharacterBoundaries(this.x, this.y);

		if (this.keyHeld_Push) {
			console.log(walkIntoTileIndex);

			//if direction I'm facing is has a wall in the next space AND the space behind that is empty
			pushBlock();

		}

		if (getTileType(nextX + 25, nextY) == WALL) {
			
		} // I think this needs to get wrapped into the GROUND nextX check

		if (walkIntoTileIndex == CHALICE) {
			console.log(player.name + " You WIN. Good jerb.");
			loadLevel(levelOne);	
		} else if (walkIntoTileIndex == GROUND && // Only moves if there's ground ahead
			getTileType(nextX + (TILE_W/2 - 1), nextY) != WALL && // Keeps right moving player from overlapping wall
			getTileType(nextX - (TILE_W/2 - 1), nextY) != WALL && // Keeps left moving player from overlapping wall
			getTileType(nextX, nextY + (TILE_H/2 - 1)) != WALL && // Keeps downward moving player from overlapping wall
			getTileType(nextX, nextY - (TILE_H/2 - 1)) != WALL) { // Keeps upward moving player from overlapping wall
			this.x = nextX;
			this.y = nextY;	
		} else if (walkIntoTileIndex == WALL) {
			var emptyCheck = worldGrid[giveIndexForObstacle(this.x, this.y, nextX, nextY) + (directionAugment)];
			if (emptyCheck != GROUND) {
				pushAllowed = false;
			} else {
				pushAllowed = true;
			}
		}
		/*} else if (walkIntoTileIndex == DOOR) {
			if (keysOwned > 0) {
				worldGrid[giveIndexForObstacle(this.x, this.y, nextX, nextY)] = GROUND;
				keysOwned--;
				console.log("You have " + keysOwned);
			}
		}*/
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myPlayerPic, this.x, this.y, this.ang);
	}

	function senseCharacterBoundaries(x, y) {
		var rightSensor = x + TILE_W/2;
		if (getTileType(rightSensor, y) == WALL) {
			return (x - 24);
		}
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

function pushBlock() {
	if (pushAllowed) {
		console.log("push is allowed and pushBlock called");
	}
}