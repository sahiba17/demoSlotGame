import CanvasManager from '../CanvasManager'
import { ReelContainer } from '../reel/reelContainer'
import { Reel } from '../reel/reel'
import { GameConstants } from '../constants/gameConstants'
import { GameSymbol } from '../symbols/gameSymbol'
import { ReelData } from '../data/reelData'
import { WinAnimation } from '../winPresentations/winAnimations'
export default class MainScene extends Phaser.Scene {
  public startBtn: Phaser.GameObjects.Image;
  public reelContainer: ReelContainer;
  public winAnimation: WinAnimation;
  public background: Phaser.GameObjects.Image;
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0);
    this.reelContainer = this.createReelContainer();
    this.winAnimation = new WinAnimation(this);
    let symbols = this.createSymbols();
    this.reelContainer.setSymbols(symbols);
    this.reelContainer.setInitReels(ReelData.generateReelData(false));
    this.startBtn = this.createBtn();
    this.enableStartBtn();
  }

  private startReels() {
    this.disableStartBtn();
    let isWin = ReelData.getRandomInt(1) ? true : false;
    let reelData = ReelData.generateReelData(isWin);
    this.reelContainer.setReels(reelData);
    this.reelContainer.startReels(this.onReelSpinFinish.bind(this));
  }
  createBtn(): Phaser.GameObjects.Image {
    let btn = this.add.image(GameConstants.SPIN_BTN_X, GameConstants.SPIN_BTN_Y, 'btn').setInteractive();
    btn.scale = 2;
    return btn;
  }

  createSymbols(): GameSymbol[] {
    // not much use right now, but we can set all the types of animations for a symbol on symbol class and manage them at different phases
    let _symbols: GameSymbol[] = [];
    _symbols.push(new GameSymbol(this, GameConstants.SYM_1, 'sym1'));
    _symbols.push(new GameSymbol(this, GameConstants.SYM_2, 'sym2'));
    _symbols.push(new GameSymbol(this, GameConstants.SYM_3, 'sym3'));
    _symbols.push(new GameSymbol(this, GameConstants.SYM_4, 'sym4'));
    _symbols.push(new GameSymbol(this, GameConstants.SYM_5, 'sym5'));
    _symbols.push(new GameSymbol(this, GameConstants.SYM_6, 'sym6'));
    _symbols.push(new GameSymbol(this, GameConstants.SYM_7, 'sym7'));
    return _symbols;

  }
  createReelContainer(): ReelContainer {
    // adding and placing 3 reels on the screen
    let rc = new ReelContainer(this, GameConstants.REEL_X, GameConstants.REEL_Y, 3 * (GameConstants.SYM_WIDTH + GameConstants.REEL_GAP), 3 * GameConstants.SYM_HEIGHT);
    // rc.view.add(this.add.image(0, 0, 'bg'));//new Phaser.GameObjects.Image(this,0,0,'bg');
    rc.addReels(new Reel(this, 0, 0, 0, 3, GameConstants.SYM_WIDTH, GameConstants.SYM_HEIGHT));
    rc.addReels(new Reel(this, 1, GameConstants.SYM_WIDTH + GameConstants.REEL_GAP, 0, 3, GameConstants.SYM_WIDTH, GameConstants.SYM_HEIGHT));
    rc.addReels(new Reel(this, 2, 2 * (GameConstants.SYM_WIDTH + GameConstants.REEL_GAP), 0, 3, GameConstants.SYM_WIDTH, GameConstants.SYM_HEIGHT));
    return rc;
  }
  private onReelSpinFinish(): void {
    this.startWinPresentation();
  }
  private startWinPresentation(): void {
    this.winAnimation.start(() => { this.enableStartBtn() });
  }
  private enableStartBtn(): void {
    this.startBtn.alpha = 1;
    this.startBtn.once('pointerup', this.startReels, this);
  }
  private disableStartBtn(): void {
    // this.startBtn.removeAllListeners('pointerup');
    this.startBtn.alpha = 0.2;
    //didn't removed event because it was added for once
  }
}
