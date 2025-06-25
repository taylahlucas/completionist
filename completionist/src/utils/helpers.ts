import { urls } from './constants';
import * as RNLocalize from 'react-native-localize';
import { LanguageType } from './custom-types';

export function getApiNameFromUrl(url: string) {
  const currentUrl = urls.find((value: string) => url.includes(value));

  if (currentUrl) {
    switch (currentUrl) {
      case 'signup':
        return 'Sign Up';
      case 'exists':
        return 'Check User Exists';
      case 'link':
        return 'Link And Sign In';
      case 'signin':
        return 'Sign In';
      case 'reset':
        return 'Forgot Pw';
      case 'verify':
        return 'Send Verification Email';
      case 'id':
        return 'Get User By User Id';
      case 'update':
        return 'Update User';
      case 'pw':
        return 'Change Pw';
      case 'send':
        return 'Send Email';
      case 'delete':
        return 'Delete User';
      case 'steam/profile':
        return 'Steam Profile';
      case 'steam/achievements':
        return 'Steam Achievements';
      case 'ISteamUserStats':
        return 'Steam Achievements By Id';
      default:
        return 'No url name found.';
    }
  }
  return url;
}

export const getUserLang = (): LanguageType => {
  const locales = RNLocalize.getLocales();
  const currentLang = locales[0]?.languageTag.split('-')[0] || 'en';

  if (currentLang as LanguageType) {
    return currentLang as LanguageType;
  } else {
    return 'en' as LanguageType;
  }
};
