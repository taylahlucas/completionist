import * as RNLocalize from 'react-native-localize';
import * as ar from '../../../translations/ar/index.js';
import * as de from '../../../translations/de/index.js';
import * as en from '../../../translations/en/index.js';
import * as es from '../../../translations/es/index.js';
import * as fr from '../../../translations/fr/index.js';
import * as hi from '../../../translations/hi/index.js';
import * as id from '../../../translations/id/index.js';
import * as it from '../../../translations/it/index.js';
import * as ja from '../../../translations/ja/index.js';
import * as pt from '../../../translations/pt/index.js';
import * as tr from '../../../translations/tr/index.js';
import * as vi from '../../../translations/vi/index.js';
import * as zh from '../../../translations/zh/index.js';

interface TranslatedGameDataReturnType {
  skyrimQuests: any;
  skyrimCollectables: any;
  skyrimLocations: any;
  skyrimMisc: any;

  fallout4Quests: any;
  fallout4Collectables: any;
  fallout4Locations: any;
  fallout4Misc: any;
}

const useGetTranslatedGameData = (): TranslatedGameDataReturnType => {
  const userLocale = RNLocalize.getLocales()[0]?.languageCode || 'en';

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
  }

  return {
    skyrimQuests: languageDb.skyrimQuests,
    skyrimCollectables: languageDb.skyrimCollectables,
    skyrimLocations: languageDb.skyrimLocations,
    skyrimMisc: languageDb.skyrimMisc,

    fallout4Quests: languageDb.fallout4Quests,
    fallout4Collectables: languageDb.fallout4Collectables,
    fallout4Locations: languageDb.fallout4Locations,
    fallout4Misc: languageDb.fallout4Misc
  };
};

export default useGetTranslatedGameData;