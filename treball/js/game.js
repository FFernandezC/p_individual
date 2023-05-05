"use strict";

class GameScene extends Phaser.Scene{
    constructor () {
        super('GameScene')
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.correct = 0;
        this.PlayEnded = false;
        this.keyboardSave = null;
        this.name = prompt("Username") || "[ ]";
		this.options_data = JSON.parse(localStorage.getItem("config") || '{"cards":2,"dificulty":"easy","mode_2":"mode_easy"}');
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

        let points = 0, temps = 0;
        if(this.options_data.dificulty == "easy"){points = 10; temps = 3000;}
        else if(this.options_data.dificulty == "normal"){points = 20; temps = 2000;}
        else{points = 30; temps = 1000;}

        /* Array with cards state*/
        var cardsUpDown = new Array(this.options_data.cards*2).fill(false);

        /* Array of shuffled cards and background color */
        let arraycards = ['cb','co','sb','so','tb','to'];
        //[I]: Inforation of [Phaser.Utils.Array.Shuffle] in: https://newdocs.phaser.io/docs/3.55.2/focus/Phaser.Utils.Array.Shuffle
        console.log("Array inicial: " + arraycards);
        this.cameras.main.setBackgroundColor(0xBFFCFF);

        // Generate the Array of duplicate cards
        let Generator_1 = 0, card_pos = 0;
        let GeneratedArray = [];
        while (Generator_1 < this.options_data.cards) {
            GeneratedArray.push(arraycards[card_pos]);
            GeneratedArray.push(arraycards[card_pos]);
            card_pos++;
            Generator_1++;
        }
        
        console.log("Array duplidada: " + GeneratedArray);
        // Shuffle the cards inside the Array
        GeneratedArray = Phaser.Utils.Array.Shuffle(GeneratedArray);
        console.log("Array definitiva Barejada: " + GeneratedArray);

        this.add.text(75, 50, "Is playing: " + this.name, {fontFamily: 'New Century Schoolbook', fontSize: '25px', fill: '#000'});
        const SaveGame = this.add.text(350, 440, 'Save Game', {fontFamily: 'New Century Schoolbook', fontSize: '25px', fill: '#000', backgroundColor: "deepskyblue"}).setInteractive().on('pointerdown', () => this.guardar(this.name, this.score, GeneratedArray, cardsUpDown));
        let ScoreText = this.add.text(575, 50, "Score: " + this.score, {fontFamily: 'New Century Schoolbook', fontSize: '25px', fill: '#000'});
        //[I] Information of [this.add.text] in: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html

        // Show all cards on screen
        let show_cards = 0, x = 150, linia = 0;
        while (show_cards < this.options_data.cards*2) {
            if (show_cards < 6){
                this.add.image(x, 200, GeneratedArray[show_cards]);
            }else if (show_cards == 6){
                x = 150;
                this.add.image(x, 350, GeneratedArray[show_cards]);
            }else if (show_cards > 6){
                this.add.image(x, 350, GeneratedArray[show_cards]);
            }
			show_cards++;
			x+=100;
		}

        // Cards Physics are static
        this.cards = this.physics.add.staticGroup();

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
        
            // Gameplay of the game [clicks, loose, win and score]
            let i = 0;
            this.cards.children.iterate((card)=>{
                card.card_id = GeneratedArray[i];
                i++;
                card.setInteractive();
                card.on('pointerup', ()=> {
                    if(this.PlayEnded != true){
                        card.disableBody(true, true);
                        if (this.firstClick){
                            if (this.firstClick.card_id !== card.card_id){
                                card.disableBody(true, true);
                                this.score -= points;
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
                                    if(GeneratedArray[loopSave] == this.firstClick.card_id){
                                        cardsUpDown[loopSave]=true;
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
                        console.log(cardsUpDown);
                    }
                }, card);
            });
        }, temps);        
    }
    guardar(name, score, cards, cardsUpDown){
        var DataGuardarPartida = {
            NomPlayer: name,
            ScorePlayer: score,
            CardsGame: cards,
            CardsState: cardsUpDown
        };
        // If the player already has a game, it overwrites it
        var saves_json = JSON.parse(localStorage.getItem("saves"));
        
        var arr = [];
        arr = saves_json;

        var loopSearch = 0;
        var trobat = false;

        while(!trobat)
        {console.log("L:" + loopSearch)
            if(arr[loopSearch].NomPlayer == name){
                trobat = true;
                break;
            }
            else{
                
                if(loopSearch == arr.length-1){
                    break;
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
            console.log("IndexOf: " + saves_json.indexOf(DataGuardarPartida.NomPlayer));
        }
        else
        {
            var arraytempSave = [];
            if(localStorage.saves){
                arraytempSave = JSON.parse(localStorage.saves);
                if(!Array.isArray(arraytempSave)){arraytempSave = [];}
            }
            arraytempSave[loopSearch] = DataGuardarPartida;
            localStorage.saves = JSON.stringify(arraytempSave);
            console.log("IndexOf: " + saves_json.indexOf(DataGuardarPartida.NomPlayer));
        }                                   
    }
}