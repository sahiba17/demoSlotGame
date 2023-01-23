import PreloadScene from '../../lib/loader/preloaderScene'
import DeviceInfo from '../../scenes/DeviceInfo'
import { GameConstants } from '../constants/gameConstant';


export default class GamePreloadScene extends PreloadScene {
  constructor() {
    super()
    
  }

  preload() {
    super.preload()
    this.load.on('filecomplete-image-energycontainer', (key, type, data) => {
      this.setupLoadingBar();
      DeviceInfo.isDesktop ? this.loadDesktopAsset() : this.loadMobileAsset()
    });
    
  }

  loadDesktopAsset(): void {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('background', 'assets/img/background.png')
    this.load.image('frame', 'assets/img/frame.png')
    this.load.image('logo', 'assets/img/logo.png')
    this.load.atlas('symbols', "assets/img/symbols.png", "assets/img/symbols.json")
    
    this.load.on('complete', (loader, totalComplete, totalFailed) => {
      console.log(' Loading Complete ', totalComplete);
      this.scene.stop(GameConstants.PreloadScene);
      this.scene.start('MainScene')
    });
    this.load.on('progress', (percentComplete) => {
      let progress = Math.floor(percentComplete*100)
      console.log(' Loading Progress Percentage ', progress);
      this.startLoadingBar(progress);
    })
  }

  loadMobileAsset(): void {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('background', 'assets/img/background.png')
    this.load.image('frame', 'assets/img/frame.png')
    this.load.image('logo', 'assets/img/logo.png')
    this.load.atlas('symbols', "assets/img/symbols.png", "assets/img/symbols.json")
    
    this.load.on('complete', (loader, totalComplete, totalFailed) => {
      console.log(' Loading Complete ', totalComplete);
      this.scene.stop(GameConstants.PreloadScene);
      this.scene.start('MainScene')
    });
    this.load.on('progress', (percentComplete) => {
      let progress = Math.floor(percentComplete*100)
      console.log(' Loading Progress Percentage ', progress);
      this.startLoadingBar(progress);
    })
  }
}
