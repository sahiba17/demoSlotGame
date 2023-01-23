import { GameConstants, GameVariables } from "../constants/gameConstants";

// namespace MyGame.Data {
    export class ReelData {
        // used to create reels and wins data at front end for represntation purpose
        // in real game we can use this to parse the backend response into the data structure of our liking
        public static generateReelData(isWin: boolean): number[][] {
            let arr :number[][]= []; GameVariables.WINS = [];
            for (let i = 0; i < GameConstants.REEL_SYM_LENGTH.length; i++) {
                let reelData : number[] = [];
                for (let j = 0; j < GameConstants.REEL_SYM_LENGTH[i]; j++) {
                    reelData.push(this.getRandomInt(GameConstants.SYM_7));
                } arr.push(reelData);
            }
            if (isWin) {
                return this.insertWinSequence(arr);
            }
            return arr;
        }
        public static getRandomInt(max: number) : number {
            return Math.floor(Math.random() * Math.floor(max + 1));
        }
        public static insertWinSequence(reels: number[][]): number[][] {
            let winSymbol = this.getRandomInt(GameConstants.SYM_7);
            for (let r of reels) {
                for (let s = 0; s < 3; s++) {
                    r[s] = winSymbol;
                }
            }
            for (let w = 0; w < GameConstants.WIN_LINE_DATA.length; w++) {
                GameVariables.WINS.push({lineID: w, symID: winSymbol});
            }
            return reels;
        }
    }
// }