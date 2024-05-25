import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './ProgressChartStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';

interface ProgressChartItemProps {
	id: string;
	current: number;
	total: number;
	foregroundColor: string;
	backgroundColor: string;
}

const ProgressChartItem = ({ 
	id, 
	current, 
	total, 
	foregroundColor,
	backgroundColor 
}: ProgressChartItemProps) => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const percentage = total === 0 ? 0 : (current / total) * 100;

	return (
		<>
			<View
				style={{
					...styles.progressBar,
					backgroundColor: backgroundColor
				}}
			>
				<View
					style={[
						styles.progress,
						{
							width: `${percentage}%`,
							backgroundColor: foregroundColor
						}
					]}
				/>
				<StyledText
					color={theme.lightestGrey}
					style={styles.label}
					type='ListItemSubDescriptionBold'
				>
					{t(`common:screens.${id}`)}
				</StyledText>
				<StyledText
					color={theme.lightGrey}
					style={styles.percentage}
					type='ListItemSubDescriptionBold'
				>
					{`${percentage.toFixed(0)}%`}
				</StyledText>
			</View>
		</>
	);
};



export default ProgressChartItem;