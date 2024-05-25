import React, { useState } from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import { listStyles, ListShowMoreButton } from './ListStyledComponents.native';
import { renderAmountConst } from '@utils/constants'
import Condition from '../Condition.native';
import { useTranslation } from 'react-i18next';

interface CustomListProps extends ScrollViewProps {
	children: JSX.Element[];
	style?: any;
	contentContainerStyle?: ViewStyle;
	alignItems?: boolean;
	isHorizontal?: boolean;
	renderAmount?: number;
	shouldAutoScroll?: boolean;
};

const ScrollableList = React.forwardRef<ScrollView, CustomListProps>(({
	testID,
	children,
	style,
	contentContainerStyle,
	alignItems = false,
	isHorizontal = false,
	renderAmount = renderAmountConst,
	shouldAutoScroll = false,
	...props
}: CustomListProps, ref) => {
	const { t } = useTranslation();
	const { bounces } = props;
	const [updatedRenderAmount, setUpdatedRenderAmount] = useState(renderAmount);
	// This handles autoScroll for dropdown lists to ensure the entire list is in view
	const paddingBottom: number = contentContainerStyle?.paddingBottom as number ?? 80;
	
	return (
		<ScrollView
			ref={ref}
			testID={'scrollable-list'}
			contentContainerStyle={{
				...contentContainerStyle,
				...listStyles.scrollableContent,
				paddingBottom
			}}
			style={style}
			horizontal={isHorizontal}
			bounces={bounces}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
			// scrollEnabled={props.scrollEnabled}
		>
			<Condition
				condition={children.length > updatedRenderAmount}
				conditionalElement={children}
			>
				{children.slice(0, updatedRenderAmount)}
				<ListShowMoreButton
					title={t('common:showMore')}
					type='text'
					onPress={(): void => setUpdatedRenderAmount(updatedRenderAmount + renderAmountConst)}
				/>
			</Condition>
		</ScrollView>
	);
});

export default ScrollableList;