import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button, ButtonVariant, Card} from '@components/common';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

type OrderTotalProps = {
  currency: string;
  subtotal: number;
  deliveryFee: number;
  onOrderMore: () => void;
  onProceedToCheckout: () => void;
};

const OrderTotal = ({
  currency,
  subtotal,
  deliveryFee,
  onOrderMore,
  onProceedToCheckout,
}: OrderTotalProps) => {
  const {t} = useTranslation(['cart', 'button']);

  return (
    <Card>
      <View style={styles.row}>
        <Text style={styles.subtitle}>{t('cart:subtotal')}</Text>
        <Text style={styles.title}>
          {currency}
          {subtotal.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.row, styles.spacingSmall]}>
        <Text style={styles.subtitle}>{t('cart:deliveryFee')}</Text>
        <Text style={styles.title}>
          {currency}
          {deliveryFee.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.row, styles.spacingSmall]}>
        <Text style={styles.title}>{t('cart:total')}</Text>
        <Text style={[styles.title, styles.primaryText]}>
          {currency}
          {(subtotal + deliveryFee).toFixed(2)}
        </Text>
      </View>
      <View style={styles.spacingBig}>
        <Button
          variant={ButtonVariant.outlined}
          text={t('button:orderMore')}
          onPress={onOrderMore}
        />
        <Button
          style={styles.spacingMedium}
          variant={ButtonVariant.primary}
          text={t('button:proceedToCheckout')}
          onPress={onProceedToCheckout}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: getFontFamily('bold'),
    lineHeight: 24,
    letterSpacing: -1,
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: getFontFamily('medium'),
    lineHeight: 24,
    letterSpacing: -0.4,
    color: colors.secondary,
  },
  primaryText: {
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacingBig: {
    marginTop: 20,
  },
  spacingMedium: {
    marginTop: 15,
  },
  spacingSmall: {
    marginTop: 10,
  },
});

export default OrderTotal;
