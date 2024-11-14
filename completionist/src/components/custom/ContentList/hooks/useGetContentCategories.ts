import useGetGameData from '@data/hooks/useGetGameData';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';
import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';
import { ContentItem, IsActive } from '@utils/CustomInterfaces';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useContentState from './useContentState';

interface GameDataReturnType {
	getContentCategories: () => ContentItem[];
	getContentSubCategories: (category: string, selectedGame?: GameKeyEnum) => string[];
	getContentSubCategoriesTypes: (subCategory: string, selectedGame?: GameKeyEnum) => string[];
}

const useGetContentCategories = (): GameDataReturnType => {
	const { mapDataTo } = useGetGameData();
	const { sectionType } = useContentState();
	const { selectedGame, selectedGameData } = useMainState();
	const { shouldHideDisabledSections } = useGetSettingsConfig();
	const { translateCategoryName, translateDLCName } = useTranslateGameContent();

	const getContentCategories = (): ContentItem[] => {
		const section = selectedGameData?.settingsConfig.general
			.filter(config => config.section.id === sectionType)[0] ?? {
				section: {
					id: ''
				},
				categories: [],
				dlc: []
			};
		if (selectedGame) {
			const mainCategories: ContentItem[] = (shouldHideDisabledSections()
				? section?.categories.filter(category => category.isActive)
				: section?.categories)
				.map(category => {
					return {
						id: category.id,
						title: translateCategoryName(selectedGame.id, section.section.id, category.id),
						isActive: category.isActive
					}
				});
			const dlcCategories: ContentItem[] = (shouldHideDisabledSections()
				? section?.dlc.filter(dlc => dlc.isActive)
				: section?.dlc)
				.map(dlc => {
					return {
						id: dlc.id,
						title: translateDLCName(selectedGame.id, dlc.id),
						isActive: dlc.isActive
					}
				});
			return mainCategories.concat(dlcCategories);
		}
		return [];
	}

	const getContentSubCategories = (category: string, selectedGame?: GameKeyEnum): string[] => {
		const items = mapDataTo(sectionType, selectedGame);
		const filteredItems = items.filter(item => item.mainCategory === category);

		let itemSubCategories: string[] = [];
		filteredItems.map(item => {
			if (!itemSubCategories.find(category => category === item.subCategory)) {
				if (!!item.subCategory) {
					itemSubCategories.push(item.subCategory);
				}
			}
		});
		return itemSubCategories;
	}

	const getContentSubCategoriesTypes = (subCategory: string, selectedGame?: GameKeyEnum): string[] => {
		const items = mapDataTo(sectionType, selectedGame);
		const filteredItems = items.filter(collectable =>
			collectable.subCategory === subCategory
		);
		let itemSubCategoriesTypes: string[] = [];

		filteredItems.map(item => {
			if (!itemSubCategoriesTypes.find(category => category === item.subCategoryType)) {
				if (!!item.subCategoryType) {
					itemSubCategoriesTypes.push(item.subCategoryType);
				}
			}
		});
		return itemSubCategoriesTypes;
	}


	return {
		getContentCategories,
		getContentSubCategories,
		getContentSubCategoriesTypes
	}
};

export default useGetContentCategories;