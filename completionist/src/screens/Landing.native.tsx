import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import LandingForm from '@components/custom/LandingForm/LandingForm.native';

const Landing = () => {
  const theme = useGetTheme();

  return (
    <StandardLayout>
      <StyledText style={{ marginTop: 32 }} color={theme.lightestGrey}>Completionist.</StyledText>
      <LandingForm />
    </StandardLayout>
  );
};

export default Landing;