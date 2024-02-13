import React from 'react';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';
import useReactNavigation from './hooks/useReactNavigation.native';
import {
	NavigationHeaderSubTitle,
	NavigationHeaderTitleContainer,
	NavigationDrawerTitle
} from './NavigationStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import { ContentSectionEnum } from '@utils/CustomEnums';

interface NavigationDrawerItemProps {
	item: NavigationDrawerItemData;
	isActive: boolean;
}

const NavigationDrawerItem = ({ item, isActive }: NavigationDrawerItemProps) => {
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { setSelectedSection, setSelectedCategory } = useContentDispatch();

	return (
		<NavigationHeaderTitleContainer
			key={item.id}
			disabled={!item.isEnabled}
			onPress={(): void => {
				navigation.navigate(item.id);
				const contentEnum = item.id.toLocaleLowerCase();
				if (contentEnum as ContentSectionEnum) {
					setSelectedSection(contentEnum as ContentSectionEnum);
				}
				setSelectedCategory({
					category: ''
				});
			}}
		>
			<NavigationDrawerTitle
				type={'ListItemTitle'}
				color={isActive ? theme.lightGrey : theme.midGrey}
				align={'left'}
				ellipsizeMode='tail'
				numberOfLines={1}
			>
				{item.title}
			</NavigationDrawerTitle>
			<NavigationHeaderSubTitle
				color={isActive ? theme.lightGrey : theme.midGrey}
				align={'left'}
				ellipsizeMode='tail'
				numberOfLines={1}
			>
				{item.subTitle}
			</NavigationHeaderSubTitle>
		</NavigationHeaderTitleContainer>
	);
};

export default NavigationDrawerItem;