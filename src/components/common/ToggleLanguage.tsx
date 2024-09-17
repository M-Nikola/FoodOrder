import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button, ButtonVariant} from '@components/common';

const ToggleLanguage = () => {
  const {i18n} = useTranslation(['home', 'cart']);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'sr' : 'en');
  };

  return (
    <Button
      style={styles.container}
      variant={
        i18n.language === 'en' ? ButtonVariant.primary : ButtonVariant.outlined
      }
      text={i18n.language}
      onPress={changeLanguage}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ToggleLanguage;
