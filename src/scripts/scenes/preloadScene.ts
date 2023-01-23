export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    // TODO: check for device // DEVICE MANAGER
    this.preloadDesktop();
  }

  

  create() {
    this.scene.start('MainScene');
  }

  protected preloadDesktop() : void{
    this.load.image('sym1', 'assets/symbols/symbol1.png');
    this.load.image('sym2', 'assets/symbols/symbol2.png');
    this.load.image('sym3', 'assets/symbols/symbol3.png');
    this.load.image('sym4', 'assets/symbols/symbol4.png');
    this.load.image('sym5', 'assets/symbols/symbol5.png');
    this.load.image('sym6', 'assets/symbols/symbol6.png');
    this.load.image('sym7', 'assets/symbols/symbol7.png');
    this.load.image('bg', 'assets/basegame_bg.jpg');
    this.load.image('btn', 'assets/btn/btn.png');
}
}


