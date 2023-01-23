import { GameConstants } from "../../src/constants/gameConstant";

abstract class PreloadScene extends Phaser.Scene {
  private gameOptions = {
    initialTime: 60
  }
  private loadingPercentage: number = 0;
  private energyBar: Phaser.GameObjects.Image;
  private energyMask : Phaser.GameObjects.Image;
  constructor() {
    super({ key: GameConstants.PreloadScene });
    
  }

  preload() {
    console.log('preloader : preloading start')
    this.load.image('energybar', 'assets/img/energybar.png')
    this.load.image('energycontainer', 'assets/img/energycontainer.png')
  }

  abstract loadDesktopAsset(): void

  abstract loadMobileAsset(): void

 protected setupLoadingBar(): void {
    let energyContainer = this.add.sprite(
      (this.game.config.width as number) / 2,
      (this.game.config.height as number) / 2,
      'energycontainer'
    )
    this.energyBar = this.add.sprite(energyContainer.x + 46, energyContainer.y, 'energybar')
    this.energyMask = this.add.sprite(this.energyBar.x, this.energyBar.y, 'energybar')
    this.energyMask.visible = false
    this.energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask)
  }

  protected startLoadingBar (loadingPercentage) : void {
    let progress = 100 - loadingPercentage
    let stepWidth = this.energyMask.displayWidth / progress
    this.energyMask.x -= stepWidth
    
  }



  
}

export default PreloadScene
