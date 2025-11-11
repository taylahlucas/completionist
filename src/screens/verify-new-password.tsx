import React from 'react';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/navigation-header';
import { UnauthorizedScreenEnum } from '@utils/custom-enums';

export const VerifyNewPassword = () => {
  // TODO: Add to translations, add content
  return (
    <StandardLayout>
      <NavigationHeader
        id={UnauthorizedScreenEnum.VerifyNewPassword}
        title="Verify New Password"
      />
    </StandardLayout>
  );
};
