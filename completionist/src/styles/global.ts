import { Dimensions } from 'react-native';

export const windowHeight: number = Dimensions.get('window').height;
export const windowWidth: number = Dimensions.get('window').width;

export const isSmallScreen: boolean = windowHeight < 700;

export const DEFAULT_BORDER_RADIUS = 5;
export const SMALL_PADDING = 8;
export const MID_PADDING = 16;
export const LARGE_PADDING = 32;
export const EXTRA_LARGE_PADDING = 64;

export const LARGE_WIDTH = windowWidth - 32;
export const STANDARD_WIDTH = windowWidth - 64;
export const MID_WIDTH = windowWidth - 116;
export const SMALL_WIDTH = windowWidth - 144;

export const DEFAULT_FOOTER_HEIGHT = 100;
export const DEFAULT_ITEM_HEIGHT = 45;
