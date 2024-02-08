import useGetTheme from '@styles/hooks/useGetTheme';
import StyledText from '../Text/StyledText.native';
import { PriceProps } from '@utils/CustomInterfaces';
import { PriceItemContainer } from './PriceItemStyledComponents.native';

interface PriceItemProps {
    item: PriceProps;
}

const PriceItem = ({ item }: PriceItemProps) => {
	const theme = useGetTheme();
	
	return (
		<PriceItemContainer>
			<StyledText type={'Heading'} color={theme.lightGrey}>
				{`£${item.value.toString()}`}
			</StyledText>
			<StyledText type={'ListItemSubTitleItalic'}>
				{item.title}
			</StyledText>
		</PriceItemContainer>
	);
};

export default PriceItem;