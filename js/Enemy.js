const ENEMY_SPEED = 5;
var pushAllowed = false;
var directionAugment = 0;

function enemyClass() {

	this.x = 75;
	this.y = 75;
	this.myEnemyPic; // which picture to use
	this.enemyName = "Untitled Enemy";

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

	this.reset = function(someImage, setEnemyName) {
		this.enemyName = setEnemyName;
		this.myEnemyPic = someImage;

		for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
			for(var eachCol=0; eachCol<TILE_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (worldGrid[arrayIndex] == ENEMYSTART) {
					worldGrid[arrayIndex] = GROUND;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO ENEMY START FOUND!");
	} // end of playerReset func

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if (this.keyHeld_Gas) {
			nextY -= ENEMY_SPEED;
			directionAugment = -TILE_COLS;
		}
		if (this.keyHeld_Reverse) {
			nextY += ENEMY_SPEED;
			directionAugment = TILE_COLS;
		}
		
		if (this.keyHeld_TurnLeft) {
			nextX -= ENEMY_SPEED;
			directionAugment = -1;
		}
		if (this.keyHeld_TurnRight) {
			nextX += ENEMY_SPEED;
			directionAugment = 1;
		}

		if (player.x > this.x) {
			console.log("this is working");
		}
		var walkIntoTileIndex = getTileType(nextX, nextY);

		//this.x = senseCharacterBoundaries(this.x, this.y);

		if (this.keyHeld_Push) {
			//if direction I'm facing is has a wall in the next space AND the space behind that is empty
			pushBlock();

		}

		if (getTileType(nextX + 25, nextY) == WALL) {
			
		} // I think this needs to get wrapped into the GROUND nextX check

		if (walkIntoTileIndex == CHALICE) {
			console.log(enemy.name + " You WIN. Good jerb.");
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
		drawBitmapCenteredWithRotation(this.myEnemyPic, this.x, this.y, this.ang);
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