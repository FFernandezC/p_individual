var options = function(){
	// Aquí dins hi ha la part privada de l'objecte
	var options_data = {
		cards:2, dificulty:"easy", mode_2: "easy"
	};
	var load = function(){
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		options_data = JSON.parse(json);
	};
	var save = function(){
		localStorage.setItem("config", JSON.stringify(options_data));
	};
	load();
	var vue_instance = new Vue({
		el: "#options_id",
		data: {
			num: 2,
			dificulty: "normal",
			mode_2: "normal"
		},
		created: function(){
			this.num = options_data.cards;
			this.dificulty = options_data.dificulty;
			this.mode_2 = options_data.mode_2;
			console.log(this.dificulty);
		},
		watch: {
			num: function(value){
				console.log(value);
				if (value < 2)
					this.num = 2;
				else if (value > 4)
					this.num = 4;
			}
		},
		methods: { 
			discard: function(){		//Acció quan premem "DISCARD"
				this.num = options_data.cards;
				this.dificulty = options_data.dificulty;
				this.mode_2 = options_data.mode_2;
			},
			save: function(){		//Acció quan premem "SAVE"
				options_data.cards = this.num;
				options_data.dificulty = this.dificulty;
				options_data.mode_2 = this.mode_2;
				save();
				loadpage("../");
			}
		}
	});
	return {
		// Aquí dins hi ha la part pública de l'objecte
		getOptionsString: function (){
			return JSON.stringify(options_data);
		},
		getNumOfCards: function (){
			return options_data.cards;
		},
		getDificulty: function (){
			return options_data.dificulty;
		}
	}; 
}();

/*
console.log(options.getOptionsString());
console.log(options.getNumOfCards());
console.log(options.getDificulty());
console.log(options.options_data);
*/




