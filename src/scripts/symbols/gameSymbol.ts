    export class GameSymbol {
        public id: number;
        public reelAnim: string;
        constructor(scene: Phaser.Scene, id: number, path: string) {
            this.id = id;
            this.reelAnim = path;
        }
    }