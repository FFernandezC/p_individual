"use strict";
var gamesForLoad = function(){
    var vue_saves = new Vue({
        el: "#taula_games",
        data: {
            p_GamesLoad:[]
        },
        created: function(){
            let arrayGames = [];

            if(localStorage.saves)
            {
                arrayGames = JSON.parse(localStorage.saves);
                if(!Array.isArray(arrayGames)){arrayGames = [];}
            }
            this.p_GamesLoad = arrayGames;
        },
        methods: { 
            back: function(){
                loadpage("../");
            },
            loadGame: function(){
                loadpage("game.html");
            }
        }
    });
}();