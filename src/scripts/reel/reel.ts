import { GameSymbol } from "../symbols/gameSymbol";

// namespace MyGame.Reels {
export class Reel {
    public scene: Phaser.Scene;
    private _view: Phaser.GameObjects.Container;
    private _id: number;
    private _visibleCount: number;
    private _currentSymbols: any[] = [];
    private _symHeight: number;
    private _availableSymbols: GameSymbol[] = [];
    constructor(scene: Phaser.Scene, id: number, x: number, y: number, visibleCount: number, symWidth: number, symHeight: number) {
        this.scene = scene;
        this._id = id;
        this._view = scene.add.container();
        this._visibleCount = visibleCount;
        this._symHeight = symHeight;
        this.createReel(x, y, symWidth, symHeight);
    }
    private createReel(x: number, y: number, symWidth: number, symHeight: number): void {
        this._view.x = x;
        this._view.y = y;
    }
    public setInitResult(data: number[]) {
        this.clearReels();
        this._view.add(this.scene.add.image(0, 0, this._availableSymbols[data[0]].reelAnim));
        this._view.add(this.scene.add.image(0, this._symHeight, this._availableSymbols[data[1]].reelAnim));
        this._view.add(this.scene.add.image(0, 2 * this._symHeight, this._availableSymbols[data[2]].reelAnim));

    }
    public setResult(data: number[]) {
        this.clearReelsForNextSpin();
        for (let i = 0; i < data.length; i++) {
            this._view.add(this.scene.add.image(0, i * this._symHeight, this._availableSymbols[data[i]].reelAnim));
        }
        if (this._currentSymbols.length) {
            for (let i = 0; i < this._currentSymbols.length; i++) {
                this._view.add(this._currentSymbols[i]);
                this._currentSymbols[i].y = (i * this._symHeight) + (data.length * this._symHeight);
            }
            this._currentSymbols = [];
            this._view.y = -((this._view.length - 3) * this._symHeight);
        } else {

            this._view.y = -((data.length - 3) * this._symHeight);
        }
    }
    private clearReels(): void {
        this._view.removeAll(true);
    }
    //clears all reel symbols except the ones visible, so that new ones are added over it
    private clearReelsForNextSpin(): void {
        if (this._view.length < this._visibleCount) {
            this.clearReels();
            return;
        }
        for (let i = 0; i < this._visibleCount; i++) {
            this._currentSymbols.push(this._view.list.shift());
        }
        this.clearReels();
    }
    public startReel(callback: () => void): void {
        let duration = Math.abs(this._view.y * (1 / 2.5)); //2.5-> speed in pixel per miliseconds
        let tween = this.scene.tweens.add({
            targets: this._view,
            y: 0,
            duration: duration,
            onComplete: () => {
                if (this._id === 2) { callback(); }}
            });
    }
    public getSymatRow(idx: number): Phaser.GameObjects.Image {
        return this.view.list[idx] as Phaser.GameObjects.Image;
    }
    set availableSymbols(data: GameSymbol[]) {
        this._availableSymbols = data;
    }
    get availableSymbols(): GameSymbol[] {
        return this._availableSymbols;
    }
    get view(): Phaser.GameObjects.Container {
        return this._view;
    }
}
// }