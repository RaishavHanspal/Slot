import { Display, GameObjects, Utils } from "phaser";
import config from "../PositionData/config"

export class Reel extends GameObjects.Container {
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: GameObjects.GameObject[], private id?: number) {
        super(scene, x, y, children);
        this.setStoppedReel();
    }

    public setStoppedReel(): void {
        this.removeAll();
        this.removeAllListeners();
        const symbolArray: number[] = this.getRandomReel();
        symbolArray.forEach((symbolId: number, index) => {
            this.add(this.scene.add.image(0, (index - 1) * (config.reels.symbolHeight + config.reels.symbolGap), config.reels.symbolMap[symbolId]));
        });
    }

    public getRandomReel() {
        const possibleSymbols = [0, 1, 2, 3, 4];
        return Utils.Array.Shuffle(possibleSymbols);
    }

    public onSymbolShifted():void{
        this.y = 0;
        this.getAll().forEach((symbol: GameObjects.Image) => {
            if (symbol.y < ((config.reels.symbolCount - 1) * (config.reels.symbolHeight + config.reels.symbolGap))) {
                symbol.y += (config.reels.symbolHeight + config.reels.symbolGap);
            }
            else {
                symbol.y = - (config.reels.symbolHeight + config.reels.symbolGap);
            }
        });
    }

    /** enable reel spinning using tween */
    public spin() {
        this.scene.tweens.add({
            targets: this,
            alpha: config.reels.spinBlurAlpha,
            duration: config.reels.spinSpeed,
        });
        this.scene.tweens.add({
            targets: this,
            y: (config.reels.symbolHeight + config.reels.symbolGap),
            duration: config.reels.spinSpeed,
            repeat: config.reels.repetitions,
            onRepeat: () => {
                this.onSymbolShifted();
            },
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this,
                    alpha: 1,
                    duration: config.reels.spinSpeed,
                });
                this.onSymbolShifted();
            },
        })
    }
}