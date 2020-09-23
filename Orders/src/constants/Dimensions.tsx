import {Dimensions, PixelRatio} from 'react-native';
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

//Set mockup width in dp example IphoneXS 414
export const MOCKUP_WIDTH = 414;
//Set mockup height in dp example IphoneXS 896
export const MOCKUP_HEIGHT = 896;

//Converts dp from mockup to current device
export const mockupWidthToDP = (mockupWidth: number) => {
  if (MOCKUP_WIDTH > DEVICE_WIDTH) {
    return PixelRatio.roundToNearestPixel(
      mockupWidth * (Math.round((DEVICE_WIDTH / MOCKUP_WIDTH) * 1000) / 1000),
    );
  } else {
    return PixelRatio.roundToNearestPixel(
      mockupWidth * (DEVICE_WIDTH / MOCKUP_WIDTH),
    );
  }
};
export const mockupHeightToDP = (mockupHeight: number) => {
  if (MOCKUP_HEIGHT > DEVICE_HEIGHT) {
    return PixelRatio.roundToNearestPixel(
      mockupHeight *
        (Math.round((DEVICE_HEIGHT / MOCKUP_HEIGHT) * 1000) / 1000),
    );
  } else {
    return PixelRatio.roundToNearestPixel(
      mockupHeight * (DEVICE_HEIGHT / MOCKUP_HEIGHT),
    );
  }
};
