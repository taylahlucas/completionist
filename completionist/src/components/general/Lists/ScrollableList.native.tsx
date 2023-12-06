import { ScrollView } from 'react-native';
import { listStyles } from './ListStyledComponents.native';

interface CustomListProps {
  children: JSX.Element | JSX.Element[];
  style?: any;
  contentContainerStyle?: any;
  isHorizontal?: boolean;
};

const ScrollableList = ({ children, style, contentContainerStyle, isHorizontal = false }: CustomListProps) => {
  return (
    <ScrollView 
      contentContainerStyle={{...listStyles.scrollableContent, ...contentContainerStyle}}
      style={{...listStyles.scrollableList, ...style}}
      horizontal={isHorizontal}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollableList;