export interface IReelPosition{
    x: number,
    y: number
}

export interface IReelConfig{
    symbolWidth: number,
    symbolHeight: number,
    symbolCount: number,
    reelPositions: IReelPosition,
    symbolMap: Array<string> 
}