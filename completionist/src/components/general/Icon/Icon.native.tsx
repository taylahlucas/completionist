import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IconTypeEnum } from '@utils/CustomEnums';
import { IconType } from '@utils/CustomTypes';

export interface IconProps {
  name: IconType;
  style?: any;
  type?: IconTypeEnum;
  color?: string;
  size?: number;
}

const Icon = ({ name, style, type = IconTypeEnum.MaterialIcons, color = 'white', size = 25 }: IconProps) => {
  switch (type) {
    case IconTypeEnum.MaterialIcons:
      return <MaterialIcon style={style} name={name} color={color} size={size} />
    case IconTypeEnum.MaterialCommunityIcons:
      return <MaterialCommunityIcon style={style} name={name} color={color} size={size} />
    case IconTypeEnum.Ionicons:
      return <Ionicon style={style} name={name} color={color} size={size} />
    case IconTypeEnum.FontAwesome:
      return <FontAwesome style={style} name={name} color={color} size={size} />
    default: 
      return <MaterialIcon style={style} name={name} color={color} size={size} />
  }
};

export default Icon;