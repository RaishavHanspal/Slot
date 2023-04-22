import { Display, GameObjects, Utils } from "phaser";

export class Reel extends GameObjects.Container {
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: GameObjects.GameObject[], private id?: number, private readonly reelsConfig?: any) {
        super(scene, x, y, children);
        this.setStoppedReel();
    }

    public setStoppedReel(): void {
        this.removeAll();
        this.removeAllListeners();
        const symbolArray: number[] = this.getRandomReel();
        symbolArray.forEach((symbolId: number, index) => {
            this.add(this.newSymbol(0, (index - 1) * (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap), this.reelsConfig.symbolMap[symbolId]));
        });
    }

    public getRandomReel() {
        const possibleSymbols = [0, 1, 2, 3, 4];
        return Utils.Array.Shuffle(possibleSymbols);
    }

    private newSymbol(x: number, y: number, frameName: string){
        let _newSymbol: GameObjects.Sprite | GameObjects.Image;
        switch(this.reelsConfig.symbolImportType){
            case "sprite": {
                _newSymbol = this.scene.add.sprite(x, y, "symbols", frameName);
            } break;
            case "image": {
                _newSymbol = this.scene.add.image(x, y, frameName);
            } break;
        }
        return _newSymbol;
    }

    public onSymbolShifted():void{
        this.y = 0;
        this.getAll().forEach((symbol: GameObjects.Image) => {
            if (symbol.y < ((this.reelsConfig.symbolCount - 1) * (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap))) {
                symbol.y += (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap);
            }
            else {
                symbol.y = - (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap);
            }
        });
    }

    /** enable reel spinning using tween */
    public spin() {
        this.scene.tweens.add({
            targets: this,
            alpha: this.reelsConfig.spinBlurAlpha,
            duration: this.reelsConfig.spinSpeed,
        });
        this.scene.tweens.add({
            targets: this,
            y: (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap),
            duration: this.reelsConfig.spinSpeed,
            repeat: this.reelsConfig.repetitions,
            onRepeat: () => {
                this.onSymbolShifted();
            },
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this,
                    alpha: 1,
                    duration: this.reelsConfig.spinSpeed,
                });
                this.onSymbolShifted();
            },
        })
    }
}