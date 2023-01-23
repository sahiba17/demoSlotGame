import { GameVariables, GameConstants } from "../constants/gameConstants";
import MainScene from "../scenes/mainScene";

// namespace MyGame.WinPresentation {
    export class WinAnimation {
        private _game: Phaser.Game;
        private _lineIDX: number;
        private _onFinCallback: Function;
        private _gameState: MainScene;
        public text: Phaser.GameObjects.Text;
        private _timer : Phaser.Time.TimerEvent;

        // represnting one single phase of evaluating the line wins;
        constructor(gameState: MainScene) {
            this._gameState = gameState;
            this.text = this.createTextFeild();
        }
        private createTextFeild(): Phaser.GameObjects.Text {
            var style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            return this._gameState.add.text(300, 0, '', style);
        }
        public start(onFinished: Function): void {
            this._onFinCallback = onFinished;
            this._lineIDX = 0;
            this.animateLine();

        }
        private animateLine(): void {
            if (this._lineIDX < GameVariables.WINS.length) {
                this.setSymAnim();
                this.text.text = 'LINE : ' + (GameVariables.WINS[this._lineIDX].lineID + 1) + ' Symbol : ' + GameVariables.WINS[this._lineIDX].symID;
                this._timer = this._gameState.time.addEvent({
                     delay: 1000,
                     callback: this.onLineAnimationFinished,
                     callbackScope: this,
                     loop: false });
            } else {
                this.text.text = '';
                this._onFinCallback();
            }
        }
        private onLineAnimationFinished () :void {
            this._timer.remove(false);
            this.stopAnim();
            this._lineIDX++;
            this.animateLine();
        }
        private setSymAnim(): void {
            // setting symbol tint to represent it's win
            for (let x = 0; x < GameConstants.WIN_LINE_DATA[GameVariables.WINS[this._lineIDX].lineID].length; x++) {
                let y = GameConstants.WIN_LINE_DATA[GameVariables.WINS[this._lineIDX].lineID][x];
                let sym = this._gameState.reelContainer.getReel(x).getSymatRow(y);
                sym.tint = 0xff0000;
            }
        }
        private stopAnim(): void {
            for (let x = 0; x < GameConstants.WIN_LINE_DATA[GameVariables.WINS[this._lineIDX].lineID].length; x++) {
                let y = GameConstants.WIN_LINE_DATA[GameVariables.WINS[this._lineIDX].lineID][x];
                let sym = this._gameState.reelContainer.getReel(x).getSymatRow(y);
                sym.tint = 0xffffff;
            }
        }
    }
// }