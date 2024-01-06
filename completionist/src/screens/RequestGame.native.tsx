import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import RequestGameContent from '@components/custom/RequestGameContent/RequestGameContent.native';

const RequestGame = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Send Request'} />
      <RequestGameContent />
    </StandardLayout>
  );
};

export default RequestGame;