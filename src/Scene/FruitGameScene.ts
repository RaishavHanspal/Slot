import { Scene } from "phaser";
import { fruitReels } from "../PositionData/config";
import { ReelGroup } from "../Reel/ReelGroup";
import { ReelsController } from "../Reel/ReelsController";

export class FruitGameScene extends Scene{
    constructor(){
        super({key: "FruitGame"});
    }
    
    /** should load these images before setting the scene  - the things loaded here */
    preload() {
    }

    /** after the preload is completed this should initialize and align the loaded assets */
    create(){
        this.add.sprite(640, 360, "bg", "bg.jpg");
        const reelConfig: any = fruitReels;
        const reelGroup: ReelGroup = new ReelGroup(this, 0, 0, null, reelConfig);
        this.add.sprite(640, 360, "bg", "bg.png");
        new ReelsController(this, reelGroup, reelConfig);
    }
}