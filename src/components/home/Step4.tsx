import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Card} from '@components/common';
import {useOrderStore} from '@stores/order';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

const Step4 = () => {
  const {currentOrder} = useOrderStore();

  const {t} = useTranslation('home');

  const totalPrice = useMemo(
    () =>
      (currentOrder.size?.price || 0) +
      (currentOrder?.extraIngredients
        ?.map(({price}) => price)
        .reduce((sum = 0, a = 0) => sum + a, 0) || 0),
    [currentOrder.size, currentOrder?.extraIngredients],
  );

  return (
    <Card>
      <View style={[styles.row, styles.spacing]}>
        <Text style={styles.title}>{currentOrder?.bowl?.name}</Text>
        <Text style={styles.title}>{`${
          currentOrder?.size?.currency
        }${currentOrder?.size?.price.toFixed(2)}`}</Text>
      </View>
      <Text style={[styles.text, styles.smallSpacing]}>
        {currentOrder?.size?.name} {t('step4.size')}
      </Text>
      <Text style={[styles.text, styles.smallSpacing]}>
        {currentOrder?.base?.name} {t('step4.base')}
      </Text>
      <Text style={[styles.text, styles.smallSpacing]}>
        {currentOrder?.sauce?.name}
      </Text>
      <Text style={styles.text}>{t('step4.addedIngredients')}</Text>
      <View style={styles.ingredients}>
        {currentOrder?.ingredients?.map(ingredient => (
          <Text key={ingredient.name} style={styles.text}>
            {ingredient.name}
          </Text>
        ))}
      </View>
      {currentOrder?.extraIngredients?.map(extraIngredient => (
        <View
          key={extraIngredient.id}
          style={[styles.row, styles.smallSpacing]}>
          <Text style={styles.text}>{extraIngredient.name}</Text>
          <Text
            style={
              styles.title
            }>{`${extraIngredient.currency}${extraIngredient.price}`}</Text>
        </View>
      ))}
      <View style={[styles.row, styles.fullPrice]}>
        <Text style={[styles.text, styles.primaryText]}>
          {t('step4.fullPrice')}
        </Text>
        <Text style={styles.title}>
          {currentOrder?.size?.currency}
          {totalPrice}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: getFontFamily('bold'),
    lineHeight: 24,
    letterSpacing: -1,
    color: colors.secondary,
  },
  spacing: {
    marginBottom: 20,
  },
  smallSpacing: {
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: getFontFamily('normal'),
    lineHeight: 24,
    letterSpacing: -0.4,
    color: colors.secondary,
  },
  primaryText: {
    color: colors.primary,
  },
  ingredients: {
    marginLeft: 15,
    marginBottom: 5,
  },
  fullPrice: {
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: colors.gray,
  },
});

export default Step4;
