import React, { useState } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { listStyles, ListShowMoreButton } from './ListStyledComponents.native';
import { renderAmountConst } from '@utils/constants'
import Condition from '../Condition.native';
import { useTranslation } from 'react-i18next';

interface CustomListProps extends ScrollViewProps {
  children: JSX.Element[];
  style?: any;
  contentContainerStyle?: any;
  isHorizontal?: boolean;
  renderAmount?: number;
};

const ScrollableList = ({ 
	testID,
	children, 
	style, 
	contentContainerStyle,
	isHorizontal = false, 
	renderAmount = renderAmountConst,
	...props
}: CustomListProps) => {
  const { t } = useTranslation();
  const { bounces } = props;
  const [updatedRenderAmount, setUpdatedRenderAmount] = useState(renderAmount);
  
  return (
    <ScrollView 
			testID={'scrollable-list'}
      contentContainerStyle={{...listStyles.scrollableContent, ...contentContainerStyle}}
      style={{...listStyles.scrollableList, ...style }}
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
          type={'text'}
          onPress={(): void => setUpdatedRenderAmount(updatedRenderAmount + renderAmountConst)}
        />
      </Condition>
    </ScrollView>
  );
};

export default ScrollableList;