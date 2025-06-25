import Overlay from '@components/general/Layouts/Overlay.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useAchievements from '@screens/Achievements/hooks/useAchievements';
import {
  DEFAULT_BORDER_RADIUS,
  isSmallScreen,
  windowHeight,
} from '@styles/global.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Modal, StyleSheet, View } from 'react-native';

const SelectLanguageModal = ({}) => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
  const translateY = useRef(new Animated.Value(windowHeight)).current;
  const theme = useGetTheme();
  const { viewModel, actions } = useAchievements();

  return (
    <Modal transparent animationType="none">
      <Overlay>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY }], backgroundColor: theme.black },
          ]}>
          <View style={styles.contentContainer}></View>
        </Animated.View>
      </Overlay>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    borderRadius: 20,
    height: 480,
    top: isSmallScreen ? 64 : 108,
  },
  contentContainer: {
    height: 460,
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    padding: 16,
    borderRadius: DEFAULT_BORDER_RADIUS,
  },
  titleContainer: {
    marginTop: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  iconButton: {
    position: 'absolute',
    right: 16,
  },
  confirmButton: {
    marginTop: 16,
  },
});

export default SelectLanguageModal;
