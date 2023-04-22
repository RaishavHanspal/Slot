import { slotGame } from "./Game";
import config from "./PositionData/config";
import { BaseGameScene } from "./Scene/BaseGameScene";
import { loadingScene } from "./Scene/loadingScene";

const slotConfig = {
    /** to use WEBGL or canvas wherever applicable */
    type: Phaser.AUTO,
    width: config.game.width,
    height: config.game.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [loadingScene, BaseGameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: config.game.width,
        height: config.game.height,
    }
};

const game = new slotGame(slotConfig);
(window as any).__PIXI_APP__ = game;