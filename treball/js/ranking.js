"use strict";
var ranking = function(){
    var vue_ranking = new Vue({
        el: "#scores",
        data: {
            p_scores:[]
        },
        created: function(){
            let arrayScores = [];

            if(localStorage.ranking)
            {
                arrayScores = JSON.parse(localStorage.ranking);
                if(!Array.isArray(arrayScores)){arrayScores = [];}
            }
            this.p_scores = arrayScores;
        },
        methods: { 
            back: function(){
                loadpage("../");
            }
        }
    });
}();