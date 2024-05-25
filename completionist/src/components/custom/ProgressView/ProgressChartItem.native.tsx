import React from 'react';
import { View } from 'react-native';
import { styles } from './ProgressChartStyledComponents.native';

interface ProgressChartItemProps {
	id: string;
	current: number;
	total: number;
	foregroundColor: string;
	backgroundColor: string;
}

const ProgressChartItem = ({ id, current, total, foregroundColor, backgroundColor }: ProgressChartItemProps) => {
	const percentage = total === 0 ? 0 : (current / total) * 100;

	return (
		<>
      <View style={{ ...styles.progressBar, backgroundColor: backgroundColor }}>
        <View style={[styles.progress, { width: `${percentage}%`, backgroundColor: foregroundColor }]} />
      </View>
    </>
	);
};



export default ProgressChartItem;