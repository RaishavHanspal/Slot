import config from "../PositionData/config";
import { TimeUtils } from "../TimeUtils";
import { Reel } from "./Reel";
import { ReelGroup } from "./ReelGroup";

export class ReelsController{
    constructor(private scene: Phaser.Scene, private reelGroup: ReelGroup){
        /** workaround */
        addEventListener("click", this.spin.bind(this));
    }

    addhandlers(): void{
        this.reelGroup.on("pointerup", this.spin, this);
    }
    spin(){
        this.reelGroup.reels.forEach((reel: Reel, index) => {
            TimeUtils.setTimeOut(config.reels.spinDelay * index, this.scene, reel.spin, reel);
        })
    }
}