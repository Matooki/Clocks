// Nathan Altice
// Created: 5/4/20
// Updated: 5/14/20
// Mappy
// Tilemap examples
// Some examples adapted from Michael Hadley's "Modular Game Worlds in Phaser 3" tutorial series

// debug with extreme prejudice
"use strict";

// game config
let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    //pixelArt: true,
    width: 320,
    height: 320,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true,
        }
    },
    scene: [Menu, ArrayMap, RandomMap, TiledSimple, TiledPlatform, ParallaxLayers, JoeyMapOne, JoeyMapTwo, SpawnMap, TilePainter, SimpleAnimation, ]
};

const game = new Phaser.Game(config);

// globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const w = game.config.width;
const h = game.config.h;
let cursors = null;