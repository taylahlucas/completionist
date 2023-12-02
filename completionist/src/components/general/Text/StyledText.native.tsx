import { Text } from 'react-native';
import { FontType, AlignmentType } from '../../../styles/Font/FontType';
import defaultStyle from '../../../styles/Font/FontStyle';
import useGetTheme from '../../../styles/hooks/useGetTheme';


interface StyledTextProps {
  children: string;
  type?: FontType;
  color?: string;
  style?: any;
  align?: AlignmentType;
}

const StyledText: React.FunctionComponent<StyledTextProps> = ({ 
  children, 
  type = 'Heading', 
  color,
  style,
  align = 'center'
}) => {
  const theme = useGetTheme();
  
  return (
    <Text style={{ ...defaultStyle[type], ...defaultStyle[align], ...style, color: color ?? theme.midGrey }}>{children}</Text>
  );
};

export default StyledText;