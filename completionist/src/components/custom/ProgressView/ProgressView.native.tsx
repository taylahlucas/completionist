import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ProgressItemData } from '@utils/CustomInterfaces';
import AchievementDropdownSubtitle from '@components/custom/AchievementView/AchievementDropdownSubtitle.native';
import ProgressChartItem from './ProgressChartItem.native';
import { STANDARD_WIDTH } from '@styles/global.native';
import useGetGameProgress from './hooks/useGetGameProgress.native';

interface ProgressViewProps {
	gameId: string;
	title: string;
	data: ProgressItemData[];
}

const ProgressView = ({ gameId, title, data }: ProgressViewProps) => {
	const theme = useGetTheme();
	const [isOpen, setOpen] = useState<boolean>(true);
	const { getGameProgress } = useGetGameProgress();
	const colors = [theme.lightPurple, '#E63656', '#26AB9D', '#D1A34D'];

	return (
		<Dropdown
			isOpen={isOpen}
			setOpen={(): void => setOpen(!isOpen)}
			header={
				<AchievementDropdownSubtitle title={title} isOpen={isOpen} />
			}
		>
			<View style={{ 
				height: 140,
				width: STANDARD_WIDTH,
				alignSelf: 'center',
				paddingTop: 8
			}}>
				{data.map((item, index) => (
					<ProgressChartItem
						key={item.id}
						id={item.id}
						current={getGameProgress(gameId, item.id)}
						total={item.total}
						foregroundColor={colors[index]}
						backgroundColor={theme.darkGrey}
					/>
				))
				}
			</View>
		</Dropdown>
	);
};

export default ProgressView;