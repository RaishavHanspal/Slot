import { GameObjects } from "phaser";
import { EventConstants } from "../Constants/Events";
import { IReelConfig } from "../interface";
import { EventUtils } from "../Utilities/EventUtils";
import { TimeUtils } from "../Utilities/TimeUtils";
import { Reel } from "./Reel";
import { ReelGroup } from "./ReelGroup";

export class ReelsController {
    private clickObject: GameObjects.Sprite | GameObjects.Container;
    constructor(private scene: Phaser.Scene, private reelGroup: ReelGroup, private readonly reelsConfig?: IReelConfig) {
        this.addhandlers();
    }

    /** assign handlers to buttons events */
    private addhandlers(): void {
        /** workaround to add window click event */
        // addEventListener("click", this.spin.bind(this));
        EventUtils.subscribe(EventConstants.onReelStopped, this.onReelStopped, this);
        if (this.reelsConfig.spinButton) {
            this.clickObject = this.scene.add.sprite(200, 625, "buttons", "btn_play.png");
        }
        else {
            this.clickObject = this.reelGroup;
        }
        this.clickObject.setInteractive();
        this.clickObject.on("pointerup", this.spin, this);
    }

    /** all the reels start spinning */
    private spin() {
        if (this.reelsConfig.spinButton) {
            this.scene.tweens.add({
                targets: this.clickObject,
                duration: 100,
                alpha: this.reelsConfig.spinBlurAlpha
            })
        }
        this.clickObject.removeInteractive();
        this.reelGroup.reels.forEach((reel: Reel, index) => {
            TimeUtils.setTimeOut(this.reelsConfig.spinDelay * index, this.scene, reel.spin, reel);
        })
    }

    /** when the each reel stops and lands this fn is called */
    private onReelStopped(reelId: any) {
        const isLastReel: boolean = reelId === (this.reelsConfig.reelPositions.length - 1);
        if (isLastReel) {
            if (this.reelsConfig.spinButton) {
                this.scene.tweens.add({
                    targets: this.clickObject,
                    duration: 100,
                    alpha: 1,
                    onComplete: () => {
                        this.clickObject.setInteractive();
                    }
                })
            }
            else {
                this.clickObject.setInteractive();
            }
            console.log("All Reels Stopped!");
        }
    }
}