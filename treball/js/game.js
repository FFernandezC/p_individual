"use strict";

class GameScene extends Phaser.Scene{
    constructor () {
        super('GameScene')
        this.game_dificulty = '';
        this.game_mode = '';
        this.num_cards = 0;
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.correct = 0;
        this.cards_play = [];
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

        // Recuperem els valors de "config" [Opcions] i extreiem les dades
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"easy","mode_2":"mode_easy"}';
		var options_data = JSON.parse(json);
		this.num_cards = options_data.cards;
		this.game_dificulty = options_data.dificulty;
        this.game_mode = options_data.mode_2;

        // Creem una "Array" de textures amb el nom de cada imatge 
        var TexturesCartas = [];
        TexturesCartas[0]='cb';
        TexturesCartas[1]='co';
        TexturesCartas[2]='sb';
        TexturesCartas[3]='so';
        TexturesCartas[4]='tb';
        TexturesCartas[5]='to';

        // Barejem l'Array de les cartes
        this.cards_play.sort(function(){return Math.random() - 0.5});   // Array aleatòria
		this.cards_play = this.cards_play.slice(0, this.num_cards);     // Agafem els primers numCards elements
		this.cards_play = this.cards_play.concat(this.cards_play);      // Dupliquem els elements
		this.cards_play.sort(function(){return Math.random() - 0.5});   // Array aleatòria

        // Fem una Array amb el numero de cartes
        this.cameras.main.setBackgroundColor(0xBFFCFF)

        var pixels_x = 200;
        var pixels_y = 300;

        this.cards_play = this.physics.add.staticGroup()

        // Mostrem lse cartes segons la dificultat
        if(this.game_dificulty === "easy"){ // 3 segons visibles


        }else if(this.game_dificulty === "normal"){// 2 segons visibles


        }else if(this.game_dificulty === "hard"){// 1 segons visibles


        }

        for(i=0;i<this.num_cards*2;i++){
            this.cards.create(pixels_x, pixels_y, 'back');
        }

        this.add.image(250, 300, 'co');
        this.add.image(350, 300, 'sb');
        this.add.image(450, 300, 'co');
        this.add.image(550, 300, 'sb');

        let i = 0;
        this.cards.children.iterate((card)=>{
            card.card_id = this.cards_play[i];
            i++;
            card.setInteractive();
            card.on('pointerup', ()=> {
                card.disableBody(true, true);

                if (this.firstClick){
                    console.log("A fet clic");
                    if (this.firstClick.card_id !== card.card_id){
                        this.score -= 20;
                        console.log(this.score);
                        this.firstClick.enableBody(false, 0, 0, true, true);
                        card.enableBody(false, 0, 0, true, true);
                        if (this.score <= 0){
                            alert("Game Over");
                            loadpage("../")
                        }
                    }
                    else{
                        this.correct++;
                        if (this.correct >= 2){
                            alert("You Win with " + this.score + " points.");
                            loadpage("../")
                        }
                    }
                    this.firstClick = null;
                }else{
                    this.firstClick = card;
                }

            }, card);
        });
    }
}