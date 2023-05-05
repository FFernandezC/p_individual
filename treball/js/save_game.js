"use strict";
var gamesForLoad = function(){
    var vue_saves = new Vue({
        el: "#taula_games",
        data: {
            p_GamesLoad:[],
            GameToLoad: 0,
            saveGames: JSON.parse(localStorage.getItem("saves"))
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
                console.log("entro")
                var loopSearch = 0, pos = 0;
                var trobat = false;

                if(this.saveGames)
                {
                    while(trobat != true && loopSearch < this.saveGames.length)
                    {
                        if(this.saveGames[loopSearch].NomPlayer == this.GameToLoad){
                            trobat = true;
                            pos = loopSearch;
                        }
                        loopSearch++;
                    }
                }
                var arraytempLoad = [];
                if(localStorage.load){
                    arraytempLoad = JSON.parse(localStorage.load);
                    if(!Array.isArray(arraytempLoad)){arraytempLoad = [];}
                }
                arraytempLoad[0] = this.saveGames[pos];
                localStorage.load = JSON.stringify(arraytempLoad);
                loadpage("game.html");
            }
        }
    });
}();