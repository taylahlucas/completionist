import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ProgressItemData } from '@utils/CustomInterfaces';
import AchievementDropdownSubtitle from '@components/custom/AchievementView/AchievementDropdownSubtitle.native';
import ProgressChartItem from './ProgressChartItem.native';
import { STANDARD_WIDTH } from '@styles/global.native';

interface ProgressViewProps {
	title: string;
	data: ProgressItemData[];
}

const ProgressView = ({ title, data }: ProgressViewProps) => {
	const theme = useGetTheme();
	const [isOpen, setOpen] = useState<boolean>(false);

	return (
		<Dropdown
			isOpen={isOpen}
			setOpen={(): void => setOpen(!isOpen)}
			header={
				<AchievementDropdownSubtitle title={title} isOpen={isOpen} />
			}
		>
			<View style={{ 
				height: 120,
				width: STANDARD_WIDTH,
				alignSelf: 'center',
				paddingTop: 8
			}}>
				{data.map((item) => (
					<ProgressChartItem
						id={item.id}
						current={item.current}
						total={item.total}
						foregroundColor={theme.lightPurple}
						backgroundColor={theme.darkGrey}
					/>
				))
				}
			</View>
		</Dropdown>
	);
};

export default ProgressView;