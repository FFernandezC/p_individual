"use strict";

class GameScene extends Phaser.Scene{
    constructor () {
        super('GameScene')
        this.cards = null;
        this.GeneratedArray = [];
        this.cardsUpDown = [];
        this.firstClick = null;
        this.points = 0;    // Points to substract
        this.score = 100;
        this.correct = 0;
        this.name = "";
        this.PlayEnded = false;
        this.keyboardSave = null;
		this.options_data = JSON.parse(localStorage.getItem("config") || '{"cards":2,"dificulty":"easy","mode_2":"mode_easy"}');
        this.saveGames = JSON.parse(localStorage.getItem("saves"));
        this.loadGames = JSON.parse(localStorage.getItem("load"));
        this.loaded = false;
    }
    preload () {
        this.load.image('back', '../resources/back.png');
        this.load.image('cb', '../resources/cb.png');
        this.load.image('co', '../resources/co.png');
        this.load.image('sb', '../resources/sb.png');
        this.load.image('so', '../resources/so.png');
        this.load.image('tb', '../resources/tb.png');
        this.load.image('to', '../resources/to.png');
    }
    create () {

        //Borra elements de l'array
        //array.splice(index,numero de element a eliminar)
        var temps = 0;
        
        if(this.loadGames)
        {
            this.score = this.loadGames[0].ScorePlayer;
            this.name = this.loadGames[0].NomPlayer;
            this.GeneratedArray = this.loadGames[0].CardsGame;
            this.cardsUpDown = this.loadGames[0].CardsState;
            this.loaded = true;

            if(this.options_data.dificulty == "easy"){this.points = 10; temps = 3000;}
            else if(this.options_data.dificulty == "normal"){this.points = 20; temps = 2000;}
            else{this.points = 30; temps = 1000;}

            // Delete file "load.json"
            localStorage.removeItem("load");
            
            var trobat = false;
            var pos = 0;
            var loopSearch = 0;
            while(trobat != true && loopSearch < this.saveGames.length)
            {
                if(this.saveGames[loopSearch].NomPlayer == this.name){
                    trobat = true;
                    pos = loopSearch;
                }
                loopSearch++;
            }
            this.saveGames.splice(pos, 1);
            localStorage.saves = JSON.stringify(this.saveGames);
        }
        else{
            this.name = prompt("Username") || "[ ]";
            if(this.options_data.dificulty == "easy"){this.points = 10; temps = 3000;}
            else if(this.options_data.dificulty == "normal"){this.points = 20; temps = 2000;}
            else{this.points = 30; temps = 1000;}

            /* Array with cards state*/
            this.cardsUpDown = new Array(this.options_data.cards*2).fill(false);

            /* Array of shuffled cards and background color */
            let arraycards = ['cb','co','sb','so','tb','to'];
            //[I]: Inforation of [Phaser.Utils.Array.Shuffle] in: https://newdocs.phaser.io/docs/3.55.2/focus/Phaser.Utils.Array.Shuffle
            
            // Generate the Array of duplicate cards
            let Generator_1 = 0, card_pos = 0;
            while (Generator_1 < this.options_data.cards) {
                this.GeneratedArray.push(arraycards[card_pos]);
                this.GeneratedArray.push(arraycards[card_pos]);
                card_pos++;
                Generator_1++;
            }   
            // Shuffle the cards inside the Array
            this.GeneratedArray = Phaser.Utils.Array.Shuffle(this.GeneratedArray);
        }

        this.cameras.main.setBackgroundColor(0xBFFCFF);
        this.add.text(75, 50, "Is playing: " + this.name, {fontFamily: 'New Century Schoolbook', fontSize: '25px', fill: '#000'});
        const SaveGame = this.add.text(350, 440, 'Save Game', {fontFamily: 'New Century Schoolbook', fontSize: '25px', fill: '#000', backgroundColor: "deepskyblue"}).setInteractive().on('pointerdown', () => this.guardar(this.name, this.score, this.GeneratedArray, this.cardsUpDown));
        var ScoreText = this.add.text(575, 50, "Score: " + this.score, {fontFamily: 'New Century Schoolbook', fontSize: '25px', fill: '#000'});
        //[I] Information of [this.add.text] in: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html

        // Cards Physics are static
        this.cards = this.physics.add.staticGroup();

        if(this.loaded == true){

            let show_cards = 0, x = 150, linia = 0;
            while (show_cards < this.GeneratedArray.length) {                
                if (show_cards < 6){
                    if (this.cardsUpDown[show_cards] == true){
                        this.add.image(x, 200, this.GeneratedArray[show_cards]);
                    }
                    else{
                        this.add.image(x, 200, this.GeneratedArray[show_cards]);
                        this.cards.create(x, 200, 'back');
                    }
                }else if (show_cards == 6){
                    x = 150;
                    if (this.cardsUpDown[show_cards] == true){
                        this.add.image(x, 350, this.GeneratedArray[show_cards]);
                    }
                    else{
                        this.add.image(x, 200, this.GeneratedArray[show_cards]);
                        this.cards.create(x, 350, 'back');
                    }
                }else if (show_cards > 6){
                    if (this.cardsUpDown[show_cards] == true){
                        this.add.image(x, 350, this.GeneratedArray[show_cards]);
                    }
                    else{
                        this.add.image(x, 200, this.GeneratedArray[show_cards]);
                        this.cards.create(x, 350, 'back');
                    }
                }
                show_cards++;
                x+=100;
            }
            this.gameplay(ScoreText);
        }else{
            // Show all cards on screen
            let show_cards = 0, x = 150, linia = 0;
            while (show_cards < this.options_data.cards*2) {
                if (show_cards < 6){
                    this.add.image(x, 200, this.GeneratedArray[show_cards]);
                }else if (show_cards == 6){
                    x = 150;
                    this.add.image(x, 350, this.GeneratedArray[show_cards]);
                }else if (show_cards > 6){
                    this.add.image(x, 350, this.GeneratedArray[show_cards]);
                }
                show_cards++;
                x+=100;
            }
            // Show cards turned over
            setTimeout(() => {
                let loop_back = 0;
                x = 150;
                while (loop_back < this.options_data.cards*2) {
                    if (loop_back < 6){
                        this.cards.create(x, 200, 'back');
                    }else if (loop_back == 6){
                        x = 150;
                        this.cards.create(x, 350, 'back');
                    }else if (loop_back > 6){
                        this.cards.create(x, 350, 'back');
                    }
                    loop_back++;
                    x+=100;
                }
                this.gameplay(ScoreText); 
            }, temps);     
        }        
    }

    gameplay(ScoreText){
        // Gameplay of the game [clicks, loose, win and score]
        let i = 0;
        this.cards.children.iterate((card)=>{
            card.card_id = this.GeneratedArray[i];
            i++;
            card.setInteractive();
            card.on('pointerup', ()=> {
                if(this.PlayEnded != true){
                    card.disableBody(true, true);
                    if (this.firstClick){
                        if (this.firstClick.card_id !== card.card_id){
                            card.disableBody(true, true);
                            this.score -= this.points;
                            ScoreText.setText("Score: " + this.score)
                            let firstCard = this.firstClick
                            setTimeout(() => {
                                firstCard.enableBody(false, 0, 0, true, true);
                                card.enableBody(false, 0, 0, true, true);
                            }, 750);

                            if (this.score <= 0){
                                this.score = 0;
                                setTimeout(() => {
                                    alert("Game Over");
                                    loadpage("../")
                                }, 200);
                            }
                        }
                        else{
                            this.correct++;
                            /* UPDATE State of card position */
                            let loopSave = 0;
                            while ( loopSave < this.options_data.cards*2) {
                                if(this.GeneratedArray[loopSave] == this.firstClick.card_id){
                                    this.cardsUpDown[loopSave]=true;
                                    loopSave += 1;
                                }else{
                                    loopSave += 1;
                                }
                            }

                            if (this.correct >= this.options_data.cards){
                                card.disableBody(true, true);

                                var DataRanking = {
                                    NomPlayer: this.name,
                                    ScorePlayer: this.score
                                };
                                var arraytemp = [];
                                if(localStorage.ranking){
                                    arraytemp = JSON.parse(localStorage.ranking);
                                    if(!Array.isArray(arraytemp)){arraytemp = [];}
                                }                                   
                                arraytemp.push(DataRanking);
                                localStorage.ranking = JSON.stringify(arraytemp);

                                setTimeout(() => {
                                    alert("You Win with " + this.score + " points.");
                                    loadpage("../")
                                }, 200);
                            }
                        }
                        this.firstClick = null;
                    }else{
                        this.firstClick = card;
                    }
                    console.log(this.cardsUpDown);
                }
            }, card);
        });
    }

    guardar(name, score, cards, cardsUpDown){
        var DataGuardarPartida = {
            NomPlayer: name,
            ScorePlayer: score,
            CardsGame: cards,
            CardsState: cardsUpDown
        };
        // If the player already has a game, it overwrites it

        var loopSearch = 0, pos = 0;
        var trobat = false;
        
        if(this.saveGames)
        {
            while(trobat != true && loopSearch < this.saveGames.length)
            {
                if(this.saveGames[loopSearch].NomPlayer == name){
                    trobat = true;
                    pos = loopSearch;
                }
                loopSearch++;
            }
        }

        if(trobat == false)
        {
            var arraytempSave = [];
            if(localStorage.saves){
                arraytempSave = JSON.parse(localStorage.saves);
                if(!Array.isArray(arraytempSave)){arraytempSave = [];}
            }
            arraytempSave.push(DataGuardarPartida);
            localStorage.saves = JSON.stringify(arraytempSave);
        }
        else
        {
            var arraytempSave = [];
            if(localStorage.saves){
                arraytempSave = JSON.parse(localStorage.saves);
                if(!Array.isArray(arraytempSave)){arraytempSave = [];}
            }
            arraytempSave[pos] = DataGuardarPartida;
            localStorage.saves = JSON.stringify(arraytempSave);
        }
                 
        setTimeout(() => {
            this.add.text(326, 400, "Game Saved! " + this.name, {fontFamily: 'New Century Schoolbook', fontSize: '25px', fill: '#000'});
        }, 500);

        setTimeout(() => {
            loadpage("../");
        }, 2000);

    }
}