"use strict";
var gamesForLoad = function(){
    var vue_saves = new Vue({
        el: "#taula_games",
        data: {
            p_GamesLoad:[],
            GameToLoad: 0
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
                var savesG = localStorage.getItem("saves");
                var savesGames = JSON.parse(savesG);

                

                //valor
                console.log(this.GameToLoad);
                //loadpage("game.html");
            }
        }
    });
}();