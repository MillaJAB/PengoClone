const TILE_W = 50;
const TILE_H = 50;
const TILE_COLS = 15;
const TILE_ROWS = 17;
const TILE_GAP = 2;
var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 1,
				 1, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 1,
				 1, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 1,
				 1, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 1,
				 1, 4, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 1,
				 1, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 1,
				 1, 0, 3, 0, 0, 0, 3, 2, 0, 0, 3, 0, 3, 0, 1,
				 1, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 1,
				 1, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1,
				 1, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 1,
				 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 1,
				 1, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 1,
				 1, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 1,
				 1, 0, 3, 0, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 1,
				 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
				 // 0 = ground, 1 = boundary, 2 = starting spot, 3 = wall, 4 = doors, 5 = goal

var worldGrid = [];

const GROUND = 0;
const BOUNDARY = 1;
const PLAYERSTART = 2;
const WALL = 3;
const ENEMYSTART = 4;
const CHALICE = 5;

function tileWithTransparency(checkTileType) {
	return (checkTileType == CHALICE);
}

function returnTileTypeAtColRow(col, row) {
	if (col >= 0 && col < TILE_COLS && 
		row >= 0 && row < TILE_ROWS) {
		var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		return worldGrid[worldIndexUnderCoord];
	} else {
		return WALL;
	}
}

function getTileType(currentX, currentY) {
	var playerWorldCol = Math.floor(currentX / TILE_W);
	var playerWorldRow = Math.floor(currentY / TILE_H);
	var worldIndexUnderPlayer = rowColToArrayIndex(playerWorldCol, playerWorldRow);
	

	if (playerWorldCol >= 0 && playerWorldCol < TILE_COLS && 
		playerWorldRow >= 0 && playerWorldRow < TILE_ROWS) {
		var tileHere = returnTileTypeAtColRow(playerWorldCol, playerWorldRow)
		
		return tileHere;
	}

	return WALL; // Changed from WORLD_WALL to fix exception, not sure if that messed anything up
} // end of playerWorldHandling();

function rowColToArrayIndex(col, row) {
	return col + TILE_COLS * row;
}

function drawWorlds() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
		for(var eachCol=0;eachCol<TILE_COLS;eachCol++) {
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];
			if (tileWithTransparency(tileKindHere)) {
				canvasContext.drawImage(worldPics[GROUND], drawTileX, drawTileY);
			}
			canvasContext.drawImage(useImg, drawTileX,drawTileY);

			drawTileX += TILE_W;
			arrayIndex++;
		} // Goes through each column
		drawTileX = 0;
		drawTileY += TILE_H;
	} // Above bits are incremented when you exit the last column and start a new row
} // end of drawWorlds func
