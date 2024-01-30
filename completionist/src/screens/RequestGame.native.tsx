import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import RequestGameContent from '@components/custom/RequestGameContent/RequestGameContent.native';

const RequestGame = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader title={t('common:screens.sendRequest')} />
      <RequestGameContent />
    </StandardLayout>
  );
};

export default RequestGame;