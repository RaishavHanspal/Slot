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
        this.reelGroup.reels.forEach((reel: Reel) => {
            reel.spin();
        })
    }
}