"use strict";

class GameScene extends Phaser.Scene{
    constructor () {
        super('GameScene')
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.correct = 0;
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

        /* Array of shuffled cards and background color */
        let arraycards = ['cb','co','sb','so','tb','to'];
        let mixed_array = Phaser.Utils.Array.Shuffle(arraycards);
        //[I]: Inforation of [Phaser.Utils.Array.Shuffle] in: https://newdocs.phaser.io/docs/3.55.2/focus/Phaser.Utils.Array.Shuffle
        console.log(mixed_array);
        this.cameras.main.setBackgroundColor(0xBFFCFF);

        this.add.text(25, 50, "Is playing: " + this.name, {fontFamily: 'Brush Script MT', fontSize: '25px', fill: '#000'});
        this.add.text(575, 50, "Score: " + this.score, {fontFamily: 'Brush Script MT', fontSize: '25px', fill: '#000'});
        //[I] Information of [this.add.text] in: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html




        // Cards Physics are static
        this.cards_play = this.physics.add.staticGroup()



        // Gameplay of the game [clicks, loose, win and score]
        let i = 0;
        this.cards.children.iterate((card)=>{
            card.card_id = this.cards_play[i];
            i++;
            card.setInteractive();
            card.on('pointerup', ()=> {
                card.disableBody(true, true);

                if (this.firstClick){
                    if (this.firstClick.card_id !== card.card_id){
                        this.score -= 20;
                        Textsc.setText('Score: ' + this.score);
                        this.firstClick.enableBody(false, 0, 0, true, true);
                        card.enableBody(false, 0, 0, true, true);
                        if (this.score <= 0){
                            alert("Game Over");
                            Textsc.setText('Score: 0')
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