import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';
import { SettingsConfigItem, IsActive } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { getCurrentGame } from '@utils/hooks/useGetCurrentGameData.native';

interface DLCOptionsReturnType {
	getDLCOptions: () => IsActive[];
	setDLCOptions: (title: string) => void;
}

const useDLCOptions = (): DLCOptionsReturnType => {
	const { t } = useTranslation();
	const { setUser, setShouldUpdateUser } = useMainDispatch();
	const { selectedGameSettings, user } = useMainState();

	const updateDLCSettingsConfig = (gameKey: GameKeyEnum, id: string) => {
		const currentGame = getCurrentGame(gameKey, user);
		if (!currentGame) {
			return;
		}
		const updatedGame = {
			...currentGame,
			settingsConfig: {
				general: currentGame.settingsConfig.general.map((config: SettingsConfigItem) => (
					{
						...config,
						dlc: config.dlc.map(dlcItem => ({
							...dlcItem,
							isActive: id === dlcItem.id ? !dlcItem.isActive : dlcItem.isActive
						}))
					}
				)),
				dlc: currentGame.settingsConfig.dlc.map(dlcItem => (
					(dlcItem.id === id) ? {
						...dlcItem,
						isActive: !dlcItem.isActive
					} : dlcItem
				))
			}
		}

		setUser({
			...user,
			gameData: {
				...user.gameData,
				...updatedGame
			},
		});
		setShouldUpdateUser(true);
	};

	const getDLCOptions = (): IsActive[] => {
		const currentGame = getCurrentGame(selectedGameSettings, user);
		if (!currentGame) {
			return [];
		}
		return currentGame.settingsConfig.dlc.map((item) => {
			return {
				id: item.id,
				title: t(`common:categories.${selectedGameSettings}.dlc.${item.id}`),
				isActive: item.isActive
			}
		});
	};

	const setDLCOptions = (id: string) => {
		updateDLCSettingsConfig(selectedGameSettings, id);
	};

	return { getDLCOptions, setDLCOptions };
};

export default useDLCOptions;