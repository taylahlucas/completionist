import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	Dropdown,
	DropdownSelection,
	DropdownSelectionContent
} from '@components/general/Dropdown/index';
import { languages } from 'src/i18n/i18n-common';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { LanguageType } from '@utils/CustomTypes';
import useGetLanguageInEn from './hooks/useGetLanguageInEn.native';

interface SettingsSelectLanguageProps {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
}

const SettingsSelectLanguage = ({ isOpen, setOpen }: SettingsSelectLanguageProps) => {
	const { t, i18n } = useTranslation();
	const { setUser } = useMainDispatch();
	const { user } = useMainState();
	const { getLanguageInEn } = useGetLanguageInEn();

	return (
		<Dropdown
			isOpen={isOpen}
			setOpen={() => null}
			header={
				<DropdownSelection
					title={`${t(`common:languages.${user.settings.lang}`)} (${getLanguageInEn(user.settings.lang)})`}
					isSelected={isOpen}
					onPress={(): void => setOpen(!isOpen)}
				/>
			}
		>
			<DropdownSelectionContent
				content={languages.map((lang) => ({
					id: lang,
					title: `${t(`common:languages.${lang}`)} (${getLanguageInEn(lang as LanguageType)})`
				}))}
				onPress={(value): void => {
					setOpen(false);
					i18n.changeLanguage(value);
					setUser({
						...user,
						settings: {
							...user.settings,
							lang: value as LanguageType
						}
					});
				}}
			/>
		</Dropdown>
	);
};

export default SettingsSelectLanguage;