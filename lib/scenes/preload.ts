export namespace SlotGame.Scene{
   export class Preload extends Phaser.Scene{
    constructor() {
         super({ key: 'PreloadScene' })
    }
    private preload():void{
      // TODO: check for device // DEVICE MANAGER
        this.loadDesktop();
        this.loadSounds();
    }
    protected loadDesktop() : void{}
    protected loadSounds() : void{}
    // create() {
    //   this.scene.start('MainScene');
    // }
}
}
