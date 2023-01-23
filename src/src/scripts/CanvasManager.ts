import Phaser from 'phaser'
import Hammer from 'hammerjs'
import MainScene from './scenes/mainScene'
import PreloadScene from './src/loader/gamePreloadScene'
import DeviceInfo from './scenes/DeviceInfo'
class CanvasManager {
  public canvas: HTMLElement;
  public hammer: HammerManager;
  public DEFAULT_WIDTH: number = 1920;
  public DEFAULT_HEIGHT: number = 1080;
  public MAX_WIDTH: number = 2048;
  public MAX_HEIGHT: number = 1152;
  public SCALE_MODE: string = 'SMOOTH'
  public game: Phaser.Game;

  constructor() {
    this.init()
    window.addEventListener('resize', event => {
      console.log('resize window')
      this.resize()
    })
    this.resize()
  }
  public init() : void{
    const config = {
      parent: 'phaser-game',
      backgroundColor: '#ffffff',
      width: this.DEFAULT_WIDTH,
      height: this.DEFAULT_HEIGHT,
      scale: {
        // we do scale the game manually in resize()
        mode: Phaser.Scale.NONE,
        width: this.DEFAULT_WIDTH,
        height: this.DEFAULT_HEIGHT
      },
      scene: [PreloadScene, MainScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 400 }
        }
      }
    }

    this.game = new Phaser.Game(config)
    this.hammer = new Hammer.Manager(this.game.canvas)
  }

  private resize(event?: any): void {
    const w = window.innerWidth
    const h = window.innerHeight

    let width: number = this.DEFAULT_WIDTH
    let height: number = this.DEFAULT_HEIGHT
    let maxWidth: number = this.MAX_WIDTH
    let maxHeight: number = this.MAX_HEIGHT
    let scaleMode: string = this.SCALE_MODE

    let scale = Math.min(w / width, h / height)
    let newWidth = Math.min(w / scale, maxWidth)
    let newHeight = Math.min(h / scale, maxHeight)

    let defaultRatio = this.DEFAULT_WIDTH / this.DEFAULT_HEIGHT
    let maxRatioWidth = this.MAX_WIDTH / this.DEFAULT_HEIGHT
    let maxRatioHeight = this.DEFAULT_WIDTH / this.MAX_HEIGHT

    let smooth = 1
    if (scaleMode === 'SMOOTH') {
      const maxSmoothScale = 1.15
      const normalize = (value, min, max) => {
        return (value - min) / (max - min)
      }
      if (width / height < w / h) {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
      } else {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
      }

      // resize the game
      this.game.scale.resize(newWidth * smooth, newHeight * smooth)

      // scale the width and height of the css
      this.game.canvas.style.width = newWidth * scale + 'px'
      this.game.canvas.style.height = newHeight * scale + 'px'

      // center the game with css margin
      this.game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`
      this.game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`
    }
  }
}
export default new CanvasManager()
