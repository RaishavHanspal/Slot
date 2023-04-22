import { TimeUtils } from "../TimeUtils";
import { Reel } from "./Reel";
import { ReelGroup } from "./ReelGroup";

export class ReelsController{
    constructor(private scene: Phaser.Scene, private reelGroup: ReelGroup, private readonly reelsConfig?: any){
        /** workaround */
        addEventListener("click", this.spin.bind(this));
    }

    addhandlers(): void{
        this.reelGroup.on("pointerup", this.spin, this);
    }
    spin(){
        this.reelGroup.reels.forEach((reel: Reel, index) => {
            TimeUtils.setTimeOut(this.reelsConfig.spinDelay * index, this.scene, reel.spin, reel);
        })
    }
}