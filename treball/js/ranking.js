"use strict";

var vue_ranking = new Vue({
    el: "#scores",
	data: {
		p_scores:[]
	},
    created: function(){
        console.log(localStorage);

        let arrayScores = [];
        console.log(localStorage.ranking);
        if(localStorage.ranking){
            
            arrayScores = JSON.parse(localStorage.ranking);
            console.log(arrayScores);
            if(!Array.isArray(arrayScores)){arrayScores = [];}
        }
        this.p_scores = arrayScores;
        console.log(this.p_scores);
    },
    methods: {
        exit_menu: function(){
            loadpage("../");
        }
    }
});
