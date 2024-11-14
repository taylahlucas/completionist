import { GameKeyEnum, ContentSectionEnum } from '@utils/CustomEnums';
import { GameContentItem, SettingsConfigItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useGetTranslatedGameData from './useGetTranslatedGameData.native';

interface GameDataReturnType {
	mapDataTo: (type: ContentSectionEnum, selectedGame?: GameKeyEnum, filter?: boolean) => GameContentItem[];
}

const useGetGameData = (): GameDataReturnType => {
	const {
		fallout3,
		fallout4,
		skyrim,
		witcher3
	} = useGetTranslatedGameData();
	const { selectedGame } = useMainState();

	// Filter active sections
	const filterData = (config: SettingsConfigItem[], data: any[]) => {
		const filteredConfig = config.filter(item => !item.section.isActive);
		filteredConfig.map(config => {
			data = data.filter(item => item.mainCategory !== config.section);
		});

		return data;
	}

	const getGameData = (selectedGame: GameKeyEnum) => {
		switch (selectedGame) {
			case GameKeyEnum.FALLOUT_3:
				return fallout3;
			case GameKeyEnum.FALLOUT_4:
				return fallout4;
			case GameKeyEnum.SKYRIM:
				return skyrim;
			case GameKeyEnum.WITCHER_3:
				return witcher3;
		}
	};

	const mapDataTo = (type: ContentSectionEnum, selectedGameId?: GameKeyEnum, filter = false): GameContentItem[] => {
		switch (type) {
			case ContentSectionEnum.QUESTS:
				const quests = mapDataToQuests(selectedGameId);
				return !filter ? quests : filterData(selectedGame?.settingsConfig.general ?? [], quests);

			case ContentSectionEnum.COLLECTABLES:
				const collectables = mapDataToCollectables(selectedGameId);
				return !filter ? collectables : filterData(selectedGame?.settingsConfig.general ?? [], collectables);

			case ContentSectionEnum.LOCATIONS:
				const locations = mapDataToLocations(selectedGameId);
				return !filter ? locations : filterData(selectedGame?.settingsConfig.general ?? [], locations);

			case ContentSectionEnum.MISCELLANEOUS:
				const miscItems = mapDataToMiscItems(selectedGameId);
				return !filter ? miscItems : filterData(selectedGame?.settingsConfig.general ?? [], miscItems);

			default:
				return []
		}
	};

	const mapDataToQuests = (selectedGame?: GameKeyEnum): GameContentItem[] => {
		if (!selectedGame) {
			return [];
		}
		else {
			return getGameData(selectedGame)
				?.filter((item: GameContentItem) => item.section === ContentSectionEnum.QUESTS)
				.map((quest: GameContentItem) => (quest as GameContentItem));
		}
	};

	const mapDataToCollectables = (selectedGame?: GameKeyEnum): GameContentItem[] => {
		if (!selectedGame) {
			return [];
		}
		else {
			return getGameData(selectedGame)
			?.filter((item: GameContentItem) => item.section === ContentSectionEnum.COLLECTABLES)
			.map((collectable: Partial<GameContentItem>) => (collectable as GameContentItem));
		}
	};

	const mapDataToMiscItems = (selectedGame?: GameKeyEnum): GameContentItem[] => {
		if (!selectedGame) {
			return [];
		}
		else {
			return getGameData(selectedGame)
			?.filter((item: GameContentItem) => item.section === ContentSectionEnum.MISCELLANEOUS)
			.map((miscItem: Partial<GameContentItem>) => (miscItem as GameContentItem));
		}
	};

	const mapDataToLocations = (selectedGame?: GameKeyEnum): GameContentItem[] => {
		if (!selectedGame) {
			return [];
		}
		else {
			return getGameData(selectedGame)
			?.filter((item: GameContentItem) => item.section === ContentSectionEnum.LOCATIONS)
			.map((location: Partial<GameContentItem>) => (location as GameContentItem));
		}
	};

	return {
		mapDataTo
	}
};

export default useGetGameData;