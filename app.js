//div conteneur
function Div() {
	this.div = document.createElement('div');
	this.div.style.cssText = 'width: 900px; height: 900px; background-color:#070707;padding: 0px; margin: 0px; position: relative';
	this.div.setAttribute("id", "app");
	document.body.appendChild(this.div);
	return this.div;
}

// nom de fonciton assez parlatn, Woue
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

var totalBees = 70;

function setup() {
	var div = Div(); // div globale
	cols = 900/w;
	rows = 900/w;
	grid = make2Darray(cols, rows);
}


function gameOver() {
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			grid[i][j].reveal();
			grid[i][j].replaceCell();
		}
	}

}

//fonction qui révèle ce qui'il y a dans la case cliquée
function mousePressed(event) {

	//on récupère les coordonnées de la souris au moment du clique, on enlève les offset, c-a-d les petites marges qu'il y a autour de la div englobante
	var myX = event.clientX - div.offsetLeft; 
	var myY = event.clientY- div.offsetTop;

	// pour chaque cellule on vérifie si les coordonées de la souris sont dans la case
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {

			//si la souris est dans une case
			if (grid[i][j].contains(myX, myY)) {
				//on passe la case a reveal() { fonction qui met à jour une valeur revealed a true dont on se sert pour afficher la case cliquée (grisée ou mine)}
				grid[i][j].reveal();
				grid[i][j].replaceCell();

				if (grid[i][j].bee) {
					gameOver();
				}

			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
	setup();
	//création de la grile avec toutes les cases
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}

	//tableau contenant tous les enplacement de cellules, on va piocher dans ce tableua 10 des emplacment au hasard pour positionner les mines
	var options = [];
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			options.push([i, j]);
		}
	}

	// positionne les mines dans des cellules au hasard
	for(var n = 0; n < totalBees; n++) {
		var index = Math.floor((Math.random() * options.length));// on récup-re un index au hasard dans le tableau de toutes les cellules

		// on récupère le i et le j de la cellule au hasard choisie
		var choice = options[index]; 
		var i = choice[0]; 
		var j = choice[1]; 

		options.splice(index, 1); // on retir la cellules choisie du tableua, ca évite de positionner 2 mines dans la même cellule
		grid[i][j].bee = true; // on attribu la mine à la cellule hasardeuse
	}

	// pour chaque grille on compte le nombre de mines voisines et on met à jour la valeur bee (guêpe, mine) de la cellule
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			grid[i][j].countBees();
		}
	}

	//afichage des toutes les cases
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}

	//appel de la fonciton quandon clique sur une case
	div.addEventListener('click', mousePressed);
}
