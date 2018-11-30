import { responsiveWidthBreakpoints } from 'settings/theme';

class ScreenSizeUtil {
  static getViewPortWidth() {
    if (typeof window !== 'undefined' && window.innerWidth) {
      return window.innerWidth;
    }

    return null;
  }

  static getScreenClass() {
    let screenClass = 'lg';

    const viewport = this.getViewPortWidth();

    if (viewport) {
      screenClass = 'xs';
      if (responsiveWidthBreakpoints[0] && viewport >= responsiveWidthBreakpoints[0]) screenClass = 'sm';
      if (responsiveWidthBreakpoints[1] && viewport >= responsiveWidthBreakpoints[1]) screenClass = 'md';
      if (responsiveWidthBreakpoints[2] && viewport >= responsiveWidthBreakpoints[2]) screenClass = 'lg';
      if (responsiveWidthBreakpoints[3] && viewport >= responsiveWidthBreakpoints[3]) screenClass = 'xl';
    }

    return screenClass;
  }

  static isSmallScreen(screenClass = this.getScreenClass()) {
    return ['sm', 'xs'].includes(screenClass);
  }

  static isLargeScreen(screenClass = this.getScreenClass()) {
    return ['md', 'lg', 'xl'].includes(screenClass);
  }
}

export default ScreenSizeUtil;
