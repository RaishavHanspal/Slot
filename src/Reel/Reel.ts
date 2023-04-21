import { GameObjects, Utils } from "phaser";
import reelConfig from "../PositionData/reelConfig"

export class Reel extends GameObjects.Container{
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: GameObjects.GameObject[]){
        super(scene, x, y, children);
        this.setStoppedReel();
    }

    public setStoppedReel(): void{
        this.removeAll();
        this.removeAllListeners();
        const symbolArray: number[] = this.getRandomReel();
        symbolArray.forEach((symbolId: number, index) => {
            this.add(this.scene.add.image(0, index * (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap), reelConfig.reels.symbolMap[symbolId]));
        });
    }

    public getRandomReel(){
        const possibleSymbols = [ 0, 1, 2, 3, 4];
        return Utils.Array.Shuffle(possibleSymbols).slice(0, reelConfig.reels.symbolCount);
    }

    public spin(){
        this.scene.tweens.add({
            targets: this, y: reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap + reelConfig.reels.y, duration:100,ease: "Quart.easeInOut", 
        })
    }
}