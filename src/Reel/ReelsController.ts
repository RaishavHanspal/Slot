import { BaseGameScene } from "../Scene/BaseGameScene";
import { ReelGroup } from "./ReelGroup";

export class ReelsController{
    constructor(private scene: Phaser.Scene, private reelGroup: ReelGroup){
        /** workaround */
        addEventListener("click", this.spin.bind(this));
    }

    spin(){
        alert("reel spin start");
        this.reelGroup.reels[0].spin();
    }
}