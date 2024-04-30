import React, { useState } from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import { listStyles, ListShowMoreButton } from './ListStyledComponents.native';
import { renderAmountConst } from '@utils/constants'
import Condition from '../Condition.native';
import { useTranslation } from 'react-i18next';
import useDetectKeyboard from '@utils/hooks/useDetectKeyboard.native';

interface CustomListProps extends ScrollViewProps {
	children: JSX.Element[];
	style?: any;
	contentContainerStyle?: ViewStyle;
	isHorizontal?: boolean;
	renderAmount?: number;
	shouldAutoScroll?: boolean;
};

const ScrollableList = React.forwardRef<ScrollView, CustomListProps>(({
	testID,
	children,
	style,
	contentContainerStyle,
	isHorizontal = false,
	renderAmount = renderAmountConst,
	shouldAutoScroll = false,
	...props
}: CustomListProps, ref) => {
	const { t } = useTranslation();
	const { bounces } = props;
	const [updatedRenderAmount, setUpdatedRenderAmount] = useState(renderAmount);
	const isKeyboardVisible = useDetectKeyboard();
	const paddingBottom: number = contentContainerStyle?.paddingBottom as number ?? 0;

	return (
		<ScrollView
			ref={ref}
			testID={'scrollable-list'}
			contentContainerStyle={{
				...listStyles.scrollableContent,
				...contentContainerStyle,
				paddingBottom: isKeyboardVisible ? paddingBottom + 400 : paddingBottom
			}}
			style={{ ...listStyles.scrollableList, ...style }}
			horizontal={isHorizontal}
			bounces={bounces}
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