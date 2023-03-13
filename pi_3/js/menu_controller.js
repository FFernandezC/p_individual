function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	//Sortir al index.html principal
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}


