function Div() {
	this.div = document.createElement('div');
	this.div.style.cssText = 'width: 900px; height: 900px; background-color:#070707;padding: 0px; margin: 0px; position: relative';
	this.div.setAttribute("id", "app");
	document.body.appendChild(this.div);
	return this.div;
}

function make2Darray(cols, rows) {
	var array = new Array(cols);

	for(var i = 0; i < array.length; i++) {
		array[i] = new Array(rows);
	}
	return array;
}

var grid;
var cols;
var rows;
var w = 45;

function setup() {
	var div = Div(); // div globale
	cols = 900/w;
	rows = 900/w;
	grid = make2Darray(cols, rows);
}

function mousePressed(event) {
	var myX = event.clientX - div.offsetLeft;
	var myY = event.clientY- div.offsetTop;
// console.log(typeof myX, typeof myY);
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			if (grid[i][j].contains(myX, myY)) {

				grid[i][j].reveal();
				console.log(grid[i][j]);
				grid[i][j].replaceCell();
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
	setup();
	console.log(grid);
	//création de la grile avec toutes les cases
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i*w, j*w, w);
		}
	}

	//afichage des toutes les cases
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}

	div.addEventListener('click', mousePressed);
}
