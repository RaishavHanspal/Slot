import { GameObjects } from "phaser";
import { IReelPosition } from "../interface";
import config from "../PositionData/config"
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
        const mask = this.scene.make.graphics({}, false).fillRect(this.x - config.reels.symbolWidth/2, this.y - config.reels.symbolHeight/2, 
        config.reels.symbolWidth * config.reels.reelPositions.length, (config.reels.symbolHeight + config.reels.symbolGap) * (config.reels.symbolCount));
        mask.setName("reelMask");
        const maskObj = this.createGeometryMask(mask);
        this.setMask(maskObj);
    }

    /** creates all reels as per the properties in config */
    private createReels(): void{
        this.x = config.reels.x;
        this.y = config.reels.y;
        config.reels.reelPositions.forEach((reelPosition: IReelPosition, index) => {
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