"use strict";

var json = localStorage.getItem("scoresJSON");
var options_data = JSON.parse(json);
var vue_ranking = new Vue({
    el: "#scores",
	data: {
		p_scores:[]
	},
    created: function(){
        let arrayScores = [];
        if(localStorage.scoresJSON){
            arrayScores = JSON.parse(localStorage.scoresJSON);
            if(!Array.isArray(arrayScores)){arrayScores = [];}
        }
        this.p_scores = arrayScores;
    },
    methods: {
        exit_menu: function(){
            loadpage("../");
        }
    }
});
