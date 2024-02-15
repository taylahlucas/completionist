import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import Button from '@components/general/Button/Button.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useMainState from '@redux/hooks/useMainState';

const SetUserName = () => {
	const navigation = useReactNavigation();
	const { user } = useMainState();
	const [userName, setUserName] = useState(user.name);
	
	return (
		<StandardLayout>
			<NavigationHeader title={'Set your User Name'} leftAction='none' />
			<TextInput
				placeholder={'Enter Username'}
				value={userName}
				onChangeText={(value: string): void => setUserName(value)}
				onReset={(): void => setUserName('')}
			/>
			<Button
				title={'Continue'}
				disabled={!!userName}
				onPress={(): void => navigation.navigate(ScreenEnum.SelectFirstGame)}
			/>
		</StandardLayout>
	);
};

export default SetUserName;