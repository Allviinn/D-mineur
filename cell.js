function Cell(x, y, w) {

	if (Math.random(1) < 0.33) {
		this.bee = true;	
	} else {
		this.bee = false;
	}
	
	this.revealed = false;

	this.x = x;
	this.y = y;
	this.w = w;
	this.id_div = this.x+'_'+this.y;
}

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
		}
	}
	this.child_div.setAttribute("id", this.id_div);
	this.child_div.style.cssText = css;
	div.appendChild(this.child_div);
}

Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
	this.revealed = true;
	
}




// function printMousePos(event) {

//   document.body.textContent =
//     "clientX: " + event.clientX +
//     " - clientY: " + event.clientY;
// }