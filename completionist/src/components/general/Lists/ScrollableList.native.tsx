import { useState } from 'react';
import { ScrollView } from 'react-native';
import { listStyles, ListShowMoreButton } from './ListStyledComponents.native';
import { renderAmountConst } from '@utils/constants'
import Condition from '../Condition.native';

interface CustomListProps {
  children: JSX.Element[];
  style?: any;
  contentContainerStyle?: any;
  isHorizontal?: boolean;
  renderAmount?: number;
};

const ScrollableList = ({ children, style, contentContainerStyle, isHorizontal = false, renderAmount = renderAmountConst }: CustomListProps) => {
  const [updatedRenderAmount, setUpdatedRenderAmount] = useState(renderAmount);
  
  return (
    <ScrollView 
      contentContainerStyle={{...listStyles.scrollableContent, ...contentContainerStyle}}
      style={{...listStyles.scrollableList, ...style}}
      horizontal={isHorizontal}
    >
      <Condition 
        condition={children.length > updatedRenderAmount}
        conditionalElement={children}
      >
        {children.slice(0, updatedRenderAmount)}
        <ListShowMoreButton
          title={'Show more'}
          type={'text'}
          onPress={(): void => setUpdatedRenderAmount(updatedRenderAmount + renderAmountConst)}
        />
      </Condition>
    </ScrollView>
  );
};

export default ScrollableList;