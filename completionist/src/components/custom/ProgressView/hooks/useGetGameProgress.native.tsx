import useMainState from '@redux/hooks/useMainState';
import { ContentSectionEnum } from '@utils/CustomEnums';

const useGetGameProgress = () => {
	const { user } = useMainState();

	const getGameProgress = (id: string, section: string): number => {
		console.log("ID: ", id)
		console.log("SECTION: ", section)
		const data = user.data[id];
		switch (section) {
			case ContentSectionEnum.QUESTS:
				return data.quests.filter(item => item.isComplete).length
			case ContentSectionEnum.COLLECTABLES:
				return data.collectables.filter(item => item.isComplete).length
			case ContentSectionEnum.LOCATIONS:
				return data.locations.filter(item => item.isComplete).length
			case ContentSectionEnum.MISCELLANEOUS:
				return data.miscellaneous.filter(item => item.isComplete).length
			default: return 0;
		}
	};

	return { getGameProgress };
};

export default useGetGameProgress;