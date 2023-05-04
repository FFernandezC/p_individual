"use strict";
var gamesForLoad = function(){
    var vue_ranking = new Vue({
        el: "#taula_games",
        data: {
            p_GamesLoad:[]
        },
        created: function(){
            let arrayGames = [];

            if(localStorage.games)
            {
                arrayGames = JSON.parse(localStorage.games);
                if(!Array.isArray(arrayGames)){arrayGames = [];}
            }
            this.p_GamesLoad = arrayGames;
        },
        methods: { 
            back: function(){
                loadpage("../");
            }
        }
    });
}();