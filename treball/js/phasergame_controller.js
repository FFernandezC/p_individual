"use strict";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
	scale: {autoCenter: Phaser.Scale.CENTER_BOTH},
	//[I]: Inforation of [Phaser.Scale.CENTER_BOTH] in: https://photonstorm.github.io/phaser3-docs/Phaser.Scale.html
    scene: [ GameScene ]
};

var game = new Phaser.Game(config);