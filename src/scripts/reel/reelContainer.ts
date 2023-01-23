import { GameConstants } from '../constants/gameConstants';
import { Reel } from '../reel/reel'
import { GameSymbol } from '../symbols/gameSymbol';
export class ReelContainer {
    private _reels: Reel[] = [];
    private _view: Phaser.GameObjects.Container;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        let rect = scene.add.graphics();
        rect.fillRect(x - (GameConstants.SYM_WIDTH/2), y - (GameConstants.SYM_HEIGHT/2), width, height);
        let mask = rect.createGeometryMask();
        this._view = scene.add.container(x, y);
        this._view.setMask(mask);

    }
    public addReels(reel: Reel): void {
        this._view.add(reel.view);
        this._reels.push(reel);
    }
    public setSymbols(symbols: GameSymbol[]): void {
        for (let reel in this._reels) {
            this._reels[reel].availableSymbols = symbols;
        }
    }
    public setInitReels(data: number[][]) {
        for (let reel in this._reels) {
            this._reels[reel].setInitResult(data[reel]);
        }
    }
    public setReels(data: number[][]) {
        for (let reel in this._reels) {
            this._reels[reel].setResult(data[reel]);
        }
    }
    public startReels(callBack: () => void) {
        for (let reel in this._reels) {
            this._reels[reel].startReel(callBack);
        }
    }
    getReel(idx: number) {
        return this._reels[idx];
    }
    get view(){
        return this._view;
    }
}
