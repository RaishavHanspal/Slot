import { GameObjects } from "phaser";
import { IReelPosition } from "../interface";
import reelConfig from "../PositionData/reelConfig"
import { Reel } from "./Reel";

export class ReelGroup extends GameObjects.Container{
    public reels: Reel[] = [];
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: GameObjects.GameObject[]){
        super(scene, x, y, children);
        scene.add.existing(this);
        this.createReels();
        this.createReelGroupMask();
        return this;
    }

    public createReelGroupMask(){
        const mask = this.scene.make.graphics({}, false).fillStyle(0, 1).fillRect(this.x - reelConfig.reels.symbolWidth/2, this.y - reelConfig.reels.symbolHeight/2, 
        reelConfig.reels.symbolWidth * reelConfig.reels.reelPositions.length, (reelConfig.reels.symbolHeight + reelConfig.reels.symbolGap) * (reelConfig.reels.symbolCount));
        mask.setName("reelMask");
        const maskObj = this.createGeometryMask(mask);
        this.setMask(maskObj);
    }

    /** creates all reels as per the properties in reelConfig */
    private createReels(): void{
        this.x = reelConfig.reels.x;
        this.y = reelConfig.reels.y;
        reelConfig.reels.reelPositions.forEach((reelPosition: IReelPosition, index) => {
            const reel: Reel = new Reel(this.scene, reelPosition.x, reelPosition.y, null, index);
            reel.setName("reel"+ index);
            this.add(reel);
            this.reels.push(reel);
        });
    }

    /** collectively sets all the reels */
    public setStoppedReels(): void{
        this.reels.forEach((reel: Reel) => {
            reel.setStoppedReel();
        })
    }
}