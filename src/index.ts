import { slotGame } from "./Game";
import { BaseGameScene } from "./Scene/BaseGameScene";
import { loadingScene } from "./Scene/loadingScene";

const config = {
    /** to use WEBGL or canvas wherever applicable */
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [loadingScene, BaseGameScene]
};

const game = new slotGame(config);
(window as any).__PIXI_APP__ = game;