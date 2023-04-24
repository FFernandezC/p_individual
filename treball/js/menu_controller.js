function phaser_game(){
	loadpage("./html/game.html");
}

function rankingScore(){
	loadpage("./html/ranking.html");
}

function options(){
	loadpage("./html/options.html");
}

function exit(){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	//Sortir al index.html principal
	loadpage("../index.html");
}




