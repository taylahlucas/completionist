import React from 'react';
import { ViewStyle } from 'react-native';
import { throttle } from 'lodash';
import StyledText from '../Text/StyledText.native';
import { StyledButtonDefault, StyledButtonNavigation, StyledButtonText, FooterButtonView } from './ButtonStyledComponents.native';
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
	const throttleValue = 3000; 

	switch (type) {
		case 'text':
			return (
				<StyledButtonText
					testID={testID}
					style={style}
					onPress={throttle(onPress, throttleValue)}
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
					onPress={throttle(onPress, throttleValue)}
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
		case 'footer':
			return (
				<FooterButtonView style={{ backgroundColor: theme.black }}>
					<StyledButtonDefault
						testID={testID}
						style={style}
						onPress={throttle(onPress, throttleValue)}
						color={!!color ? color : theme.primaryPurple}
						disabled={disabled}
					>
						<StyledText type='Heading' color={theme.lightestGrey}>
							{title}
						</StyledText>
					</StyledButtonDefault>
				</FooterButtonView>
			);
		default:
			return (
				<StyledButtonDefault
					testID={testID}
					style={style}
					onPress={throttle(onPress, throttleValue)}
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