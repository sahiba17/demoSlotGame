export default class PhaserLogo extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, 0, 0, 'background')
    scene.add.existing(this);
    this.setOrigin(0);
    this.x = ((scene.game.config.width as number) - this.width)/2;
    this.y = ((scene.game.config.width as number) - this.height)/2;
  }
}
