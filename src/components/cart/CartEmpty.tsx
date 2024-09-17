import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

const CartEmpty = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('cart');

  return (
    <Text style={styles.subtitle}>
      {t('emptyCart')}
      <Text
        style={styles.primaryText}
        onPress={() => navigation.navigate('HomeTab')}>
        {t('here')}
      </Text>
      {t('startOrdering')}
    </Text>
  );
};
const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: getFontFamily('medium'),
    lineHeight: 24,
    letterSpacing: -0.4,
    color: colors.secondary,
    marginTop: 20,
  },
  primaryText: {color: colors.primary},
});

export default CartEmpty;
