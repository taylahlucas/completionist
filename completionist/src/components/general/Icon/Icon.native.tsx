import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { IconTypeEnum } from '@utils/CustomEnums';
import { IconType } from '@utils/CustomTypes';
import { ViewStyle } from 'react-native';

export interface IconProps {
  name: IconType;
  style?: ViewStyle;
  type?: IconTypeEnum;
  color?: string;
  size?: number;
}

const Icon = ({ name, style, type = IconTypeEnum.MaterialIcons, color = 'white', size = 25 }: IconProps) => {
  switch (type) {
    case IconTypeEnum.MaterialIcons:
      return <MaterialIcon style={style} name={name} color={color} size={size} />
    case IconTypeEnum.Ionicons:
      return <Ionicon style={style} name={name} color={color} size={size} />
    default: 
      return <MaterialIcon style={style} name={name} color={color} size={size} />
  }
};

export default Icon;