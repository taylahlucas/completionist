import * as RNLocalize from 'react-native-localize';
import * as ar from '../../../translations/ar/db/index.js';
import * as de from '../../../translations/de/db/index.js';
import * as en from '../../../translations/en/db/index.js';
import * as es from '../../../translations/es/db/index.js';
import * as fr from '../../../translations/fr/db/index.js';
import * as hi from '../../../translations/hi/db/index.js';
import * as id from '../../../translations/id/db/index.js';
import * as it from '../../../translations/it/db/index.js';
import * as ja from '../../../translations/ja/db/index.js';
import * as pt from '../../../translations/pt/db/index.js';
import * as tr from '../../../translations/tr/db/index.js';
import * as vi from '../../../translations/vi/db/index.js';
import * as zh from '../../../translations/zh/db/index.js';
import useMainState from '@redux/hooks/useMainState';
import { GameContentItem } from '@utils/CustomInterfaces';

// TODO: Delete this?
interface TranslatedGameDataReturnType {
  eldenRing: GameContentItem[];
  fallout3: GameContentItem[];
  fallout4: GameContentItem[];
  skyrim: GameContentItem[];
  witcher3: GameContentItem[];
}

export const useGetTranslatedGameData = (): TranslatedGameDataReturnType => {
  const { user } = useMainState();
  // TODO: When creating user, set initial lang to RNLocalize.getLocales()[0]?.languageCode
  const userLocale = !!user
    ? user.settings.lang
    : RNLocalize.getLocales()[0]?.languageCode;

  let languageDb = en;
  switch (userLocale) {
    case 'ar':
      languageDb = ar;
      break;
    case 'de':
      languageDb = de;
      break;
    case 'es':
      languageDb = es;
      break;
    case 'fr':
      languageDb = fr;
      break;
    case 'hi':
      languageDb = hi;
      break;
    case 'id':
      languageDb = id;
      break;
    case 'it':
      languageDb = it;
      break;
    case 'ja':
      languageDb = ja;
      break;
    case 'pt':
      languageDb = pt;
      break;
    case 'tr':
      languageDb = tr;
      break;
    case 'vi':
      languageDb = vi;
      break;
    case 'zh':
      languageDb = zh;
      break;
    default:
      languageDb = en;
  }

  return {
    eldenRing: languageDb.eldenRing as GameContentItem[],
    fallout3: languageDb.fallout3 as GameContentItem[],
    fallout4: languageDb.fallout4 as GameContentItem[],
    skyrim: languageDb.skyrim as GameContentItem[],
    witcher3: languageDb.witcher3 as GameContentItem[],
  };
};
