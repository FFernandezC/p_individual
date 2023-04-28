class GameScene extends Phaser.Scene{
    constructor () {
        super('GameScene')
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.correct = 0;
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
        this.cameras.main.setBackgroundColor(0xBFFCFF)

        this.add.image(250, 300, 'co');
        this.add.image(250, 300, 'sb');
        this.add.image(250, 300, 'co');
        this.add.image(250, 300, 'sb');

        this.cards = this.physics.add.staticGroup()

        this.cards.create(250, 300, 'back');
        this.cards.create(250, 300, 'back');
        this.cards.create(250, 300, 'back');
        this.cards.create(250, 300, 'back');

        let i = 0;
        this.cards.children.iterate((card)=>{
            card.card_id = arraycards[i];
            i++;
            card.setInteractive();
            card.on('pointerup', function() {
                console.log(card.card_id);
                card.disableBody(true, true);

                if (this.firstClick){
                    if (this.firstClick.card_id !== card.card_id){
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