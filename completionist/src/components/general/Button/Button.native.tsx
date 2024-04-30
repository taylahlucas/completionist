import React from 'react';
import { ViewStyle } from 'react-native';
import StyledText from '../Text/StyledText.native';
import { StyledButtonDefault, StyledButtonNavigation, StyledButtonText } from './ButtonStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ButtonType } from '@utils/CustomTypes';
import Icon from '../Icon/Icon.native';

interface ButtonProps {
	testID?: string;
	title: string;
	type?: ButtonType;
	onPress: () => void | Promise<void>;
	style?: ViewStyle;
	disabled?: boolean;
	color?: string;
}

const Button = ({
	testID,
	title,
	type = 'default',
	onPress,
	style,
	disabled = false,
	color
}: ButtonProps) => {
	const theme = useGetTheme();

	switch (type) {
		case 'text':
			return (
				<StyledButtonText
					testID={testID}
					style={style}
					onPress={onPress}
					color={theme.darkGrey}
					disabled={disabled}
				>
					<StyledText style={{ textDecorationLine: 'underline'}}>
						{title}
					</StyledText>
				</StyledButtonText>
			);
		case 'navigation':
			return (
				<StyledButtonNavigation
					testID={testID}
					style={style}
					onPress={onPress}
					color={color ?? theme.darkGrey}
				>
					<StyledText
						type='ListItemSubTitleBold' 
						color={theme.lightestGrey}
						align='left'
					>
						{title}
					</StyledText>
					<Icon  name='arrow-right' />
				</StyledButtonNavigation>
			);
		default:
			return (
				<StyledButtonDefault
					testID={testID}
					style={style}
					onPress={onPress}
					color={!!color ? color : theme.primaryPurple}
					disabled={disabled}
				>
					<StyledText type='Heading' color={theme.lightestGrey}>
						{title}
					</StyledText>
				</StyledButtonDefault>
			);
	}
};

export default Button;