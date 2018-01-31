const TILE_W = 50;
const TILE_H = 50;
const TILE_COLS = 16;
const TILE_ROWS = 12;
const TILE_GAP = 2;
var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 1, 1, 1, 1,
				 1, 0, 3, 0, 3, 0, 1, 0, 0, 0, 1, 0, 1, 3, 3, 1,
				 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 4, 1, 4, 1, 1,
				 1, 1, 1, 4, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
				 1, 2, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 3, 0, 1, 1,
				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
				 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 1, 1,
				 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
				 1, 0, 4, 0, 4, 0, 4, 0, 5, 0, 1, 1, 1, 1, 1, 1,
				 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
				 // 0 = ground, 1 = wall, 2 = starting spot, 3 = keys, 4 = doors, 5 = goal

var worldGrid = [];

const GROUND = 0;
const WALL = 1;
const PLAYERSTART = 2;
const KEY = 3;
const DOOR = 4;
const CHALICE = 5;

function tileWithTransparency(checkTileType) {
	return (checkTileType == KEY ||
			checkTileType == DOOR ||
			checkTileType == CHALICE);
}

function returnTileTypeAtColRow(col, row) {
	if (col >= 0 && col < TILE_COLS && 
		row >= 0 && row < TILE_ROWS) {
		var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		return worldGrid[worldIndexUnderCoord];
	} else {
		return WORLD_WALL;
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

	return WORLD_WALL;
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