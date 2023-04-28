const back = "../resources/back.png";
const items = ["../resources/cb.png","../resources/co.png","../resources/sb.png",
"../resources/so.png","../resources/tb.png","../resources/to.png"];

var game = new Vue({
	el: "#game_id",
	data: {
		username:'',
		current_card: [],
		items: [],
		num_cards: 2,
		bad_clicks: 0,
		game_dificulty: '',
		started_game:false
	},
	created: function(){
		this.username = sessionStorage.getItem("username","unknown");
		this.items = items.slice(); // Copiem l'array
		
		//Recuperem els valors de "config" i el pasem json a objecte
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);
		this.num_cards = options_data.cards;
		this.game_dificulty = options_data.dificulty;
				
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.items = this.items.slice(0, this.num_cards); // Agafem els primers numCards elements
		this.items = this.items.concat(this.items); // Dupliquem els elements
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		
		//----------------------------------------------------------
		
		//Temps ambles cartes girades segons dificultat
		
			if(this.game_dificulty === "easy"){ //3 segons amb les cartes visibles
				
				setTimeout(() => {
				for (var i = 0; i < this.items.length; i++){
					Vue.set(this.current_card, i, {done: false, texture: back});
				}
				
				this.started_game = true;
				
				}, 3000); //Temps que tarda en girarse les cartes en dificultat "easy" [3seg]
			
			}else if(this.game_dificulty === "normal"){ //2 segons amb les cartes visibles

				setTimeout(() => {
				for (var i = 0; i < this.items.length; i++){
					Vue.set(this.current_card, i, {done: false, texture: back});
				}
				
				this.started_game = true;
				
				}, 2000); //Temps que tarda en girarse les cartes en dificultat "easy" [2seg]
			
			}else if(this.game_dificulty === "hard"){ //1 segons amb les cartes visibles

				setTimeout(() => {
				for (var i = 0; i < this.items.length; i++){
					Vue.set(this.current_card, i, {done: false, texture: back});
				}
				
				this.started_game = true;
				
				}, 1000); //Temps que tarda en girarse les cartes en dificultat "easy" [1seg]
			
			}

		//----------------------------------------------------------
		
		for (var i = 0; i < this.items.length; i++){
			this.current_card.push({done: false, texture: this.items[i]});
		}
	},
	methods: {
		clickCard: function(i){
			if (!this.current_card[i].done && this.current_card[i].texture === back)
				Vue.set(this.current_card, i, {done: false, texture: this.items[i]});
		}
	},
	watch: {
		
		current_card: function(value){
				
			//Surt de la funció
			if(this.started_game === false){
				return;
			}
			else{				
				if (value.texture === back) return;
				var front = null;
				var i_front = -1;
				for (var i = 0; i < this.current_card.length; i++){
					if (!this.current_card[i].done && this.current_card[i].texture !== back){
						if (front){					
							if (front.texture === this.current_card[i].texture){
								front.done = this.current_card[i].done = true;
								this.num_cards--;
							}
							else{
								
								//Mantenir la carta en "front" durante un segon per a que l'usuari vegi l'error
								if(!front){
									Vue.set(this.current_card, i_front, {done: false, texture: this.items[i]});
								}

								setTimeout(() => {
									Vue.set(this.current_card, i, {done: false, texture: back});
									Vue.set(this.current_card, i_front, {done: false, texture: back});
								}, 1000);

								this.bad_clicks++;
								break;
							}
						}
						else{
							front = this.current_card[i];
							i_front = i;
						}
					}
				}
			}			
		}
	},
	computed: {
		//Calcul de la puntuació
		score_text: function(){
			
			let score_game = 0;
			
			if(this.game_dificulty === "easy"){
				score_game = 100 - this.bad_clicks * 10;	//Puns que es perden en dificultat "easy"
			}else if(this.game_dificulty === "normal"){
				score_game = 100 - this.bad_clicks * 20;	//Puns que es perden en dificultat "normal"
			}else if(this.game_dificulty === "hard"){
				score_game = 100 - this.bad_clicks * 40;	//Puns que es perden en dificultat "hard"
			}
			return score_game;
		}
	}
});





