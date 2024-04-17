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

interface TranslatedGameDataReturnType {
	fallout4Quests: any;
	fallout4Collectables: any;
	fallout4Locations: any;
	fallout4Misc: any;

	skyrimQuests: any;
	skyrimCollectables: any;
	skyrimLocations: any;
	skyrimMisc: any;

	witcher3Quests: any;
	witcher3Collectables: any;
	witcher3Locations: any;
}

const useGetTranslatedGameData = (): TranslatedGameDataReturnType => {
	const { user } = useMainState();
	// TODO: When creating user, set initial lang to RNLocalize.getLocales()[0]?.languageCode
	const userLocale = !!user ? user.settings.lang : RNLocalize.getLocales()[0]?.languageCode;

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
		fallout4Quests: languageDb.fallout4Quests,
		fallout4Collectables: languageDb.fallout4Collectables,
		fallout4Locations: languageDb.fallout4Locations,
		fallout4Misc: languageDb.fallout4Misc,


		skyrimQuests: languageDb.skyrimQuests,
		skyrimCollectables: languageDb.skyrimCollectables,
		skyrimLocations: languageDb.skyrimLocations,
		skyrimMisc: languageDb.skyrimMisc,

		witcher3Quests: languageDb.witcher3Quests,
		witcher3Collectables: languageDb.witcher3Collectables,
		witcher3Locations: languageDb.witcher3Locations
	};
};

export default useGetTranslatedGameData;