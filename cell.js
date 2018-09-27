function Cell(i, j, w) {

	// if (Math.random(1) < 0.33) {
	// 	this.bee = true;	
	// } else {
	// 	this.bee = false;
	// }

	this.bee = false;
	
	this.revealed = false;

	this.i = i; // indexs
	this.j = j; // indexs
	this.x = i*w; // marges, position en px
	this.y = j*w; // marges, position en px
	this.w = w; // taille cellule
	this.id_div = this.x+'_'+this.y; // id d'une div, ca peut tjr servir

	this.countVoisin = 0;
}

//fonction qui compte les voisins mines (abeille) de la case cochée
Cell.prototype.countBees = function() {

	// si la case est une mine, on ne compte pas
	if (this.bee) {
		this.countVoisin = -1;
		return;
	}

	//pour chaque case, on vérifie ses idex voisin horizontaux et verticaux pour voir si il y a des case voisine avec des mines
	var total = 0;
	for(var xoff = -1; xoff <= 1; xoff++) { 
		for(var yoff = -1; yoff <= 1; yoff++ ) {

			var i = this.i + xoff;
			var j = this.j + yoff;
			
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var voisin = grid[i][j];
				// si la case voisine a une mine (bee : abeille) , on oincrémente le compte total des voisin contenant des mines
				if (voisin.bee) {
					total++;
				}
			}
				
		}
	}
	this.countVoisin = total;
}

//afichage de toutes les cases
Cell.prototype.show = function() {
	var x = this.x;
	var y = this.y;
	var css = '	cursor: pointer;\
				background-color: #b8a1c6;\
				border: 1px solid #444444;\
				position: absolute;\
				margin-left:'+x+'px;\
				margin-top:'+y+'px;\
	 			width:'+w+'px;\
	 			height:'+w+'px;\
	 		';
	var id_div = this.x+'_'+this.y;
	this.child_div = document.createElement('div');
	if (this.revealed) {
		if (this.bee)  {
			css = '	cursor: pointer;\
				background-color: #b8a1c6;\
				border: 1px solid #444444;\
				position: absolute;\
				margin-left:'+x+'px;\
				margin-top:'+y+'px;\
	 			width:'+w+'px;\
	 			height:'+w+'px;\
	 			background-image: url("licorne.png");\
	 			background-size: 35px;\
	 			background-position: center;\
	 			background-repeat: no-repeat;\
	 		';
		} else  {
			 css = '	cursor: pointer;\
						background-color: #999999;\
						border: 1px solid #444444;\
						position: absolute;\
						margin-left:'+x+'px;\
						margin-top:'+y+'px;\
			 			width:'+w+'px;\
			 			height:'+w+'px;\
			 		';
		}
	}
	this.child_div.setAttribute("id", this.id_div);
	this.child_div.style.cssText = css;
	div.appendChild(this.child_div);
}

//fonciton qui remplae une case non dévoilée, par une case dévoilé et ce qu'il y a l'intérieur (mine ou chiffre)
Cell.prototype.replaceCell = function() {
	var elem = document.getElementById(this.id_div);
	elem.parentNode.removeChild(elem);
	var x = this.x;
	var y = this.y;
	var css = '	cursor: pointer;\
				background-color: #b8a1c6;\
				border: 1px solid #444444;\
				position: absolute;\
				margin-left:'+x+'px;\
				margin-top:'+y+'px;\
	 			width:'+w+'px;\
	 			height:'+w+'px;\
	 		';
	var id_div = this.x+'_'+this.y;
	this.child_div = document.createElement('div');
	if (this.revealed) {
		if (this.bee)  {
			css = '	cursor: pointer;\
				background-color: #b8a1c6;\
				border: 1px solid #444444;\
				position: absolute;\
				margin-left:'+x+'px;\
				margin-top:'+y+'px;\
	 			width:'+(w -1)+'px;\
	 			height:'+(w -1)+'px;\
	 			background-image: url("licorne.png");\
	 			background-size: 35px;\
	 			background-position: center;\
	 			background-repeat: no-repeat;\
	 		';
		} else {
			 css = '	cursor: pointer;\
						background-color: #999999;\
						border: 1px solid #444444;\
						position: absolute;\
						margin-left:'+x+'px;\
						margin-top:'+y+'px;\
			 			width:'+(w -1)+'px;\
			 			height:'+(w -1)+'px;\
			 		';	
			if (this.countVoisin > 0) {
				this.child_div.innerHTML = '\
							<div style="width: 100%;\
							height: 100%;\
							text-align: center;\
							align-items: center;\
							line-height: 46px;\
							font-weight: bold;\
							font-size: 30px;">'
								+this.countVoisin+
							'</div>\
						';
			}		
			
		}
	}
	this.child_div.setAttribute("id", this.id_div);
	this.child_div.style.cssText = css;
	div.appendChild(this.child_div);
}

//check si le clique de la souris est dans la case actuelle
Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

//met a jour la visibilité d'une case
Cell.prototype.reveal = function() {
	this.revealed = true;

	if (this.countVoisin === 0) {
		//une fois une case cliqée et révélée, si elle a 0 voisin mine => propagation pour afficher toutes les case voisine sans voisin min en boucle
		this.propagation();
	}
	
}

Cell.prototype.propagation = function() {
	//pour chaque case, on vérifie ses idex voisin horizontaux et verticaux pour voir ses case voisines
	var total = 0;
	for(var xoff = -1; xoff <= 1; xoff++) { 
		for(var yoff = -1; yoff <= 1; yoff++ ) {
			var i = this.i + xoff;
			var j = this.j + yoff;			
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var voisin = grid[i][j];
				// si la case voisine a une mine (bee : abeille) , on oincrémente le compte total des voisin contenant des mines
				if (!voisin.bee && !voisin.revealed) {
					voisin.reveal();
					voisin.replaceCell();
				}
			}
		}
	}
}




// function printMousePos(event) {

//   document.body.textContent =
//     "clientX: " + event.clientX +
//     " - clientY: " + event.clientY;
// }