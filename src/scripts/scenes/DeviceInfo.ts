import MobileDetect from 'mobile-detect';

class DeviceInfo {
  public isDesktop: boolean;
  public isPhone: boolean;
  public pixelDensity: number;
  private mobileDetect: MobileDetect;

  constructor() {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent);
    this.isDesktop = this.mobileDetect.mobile() === null;
    this.isPhone = this.mobileDetect.phone() !== null;
    this.pixelDensity = window.devicePixelRatio;
    debugger;
  }
}

export default new DeviceInfo();
