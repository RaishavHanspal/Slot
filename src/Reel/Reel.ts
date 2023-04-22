import { Display, GameObjects, Utils } from "phaser";
import reelConfig from "../PositionData/reelConfig"

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
            this.add(this.scene.add.image(0, (index - 1) * (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap), reelConfig.reels.symbolMap[symbolId]));
        });
    }

    public getRandomReel() {
        const possibleSymbols = [0, 1, 2, 3, 4];
        return Utils.Array.Shuffle(possibleSymbols);
    }

    public spin() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0.5,
            duration: 100
        });
        this.scene.tweens.add({
            targets: this,
            y: (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap),
            duration: 100,
            repeat: 10,
            onRepeat: () => {
                this.y = 0;
                this.getAll().forEach((symbol: GameObjects.Image) => {
                    if (symbol.y < ((reelConfig.reels.symbolCount - 1) * (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap))) {
                        symbol.y += (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap);
                    }
                    else {
                        symbol.y = 0;
                    }
                });
            },
            onComplete: () => {
                this.y = 0;
                this.scene.tweens.add({
                    targets: this,
                    alpha: 1,
                    duration: 100
                });
                this.getAll().forEach((symbol: GameObjects.Image) => {
                    if (symbol.y < ((reelConfig.reels.symbolCount - 1) * (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap))) {
                        symbol.y += (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap);
                    }
                    else {
                        symbol.y = 0;
                    }
                });
            },
        })
    }
}