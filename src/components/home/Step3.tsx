import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Card, CheckBoxGroup} from '@components/common';
import {getFontFamily} from '@utils/fonts';
import {getExtraIngredients} from '@api/index';
import {useOrderStore} from '@stores/order';
import colors from '@utils/colors';

const Step3 = () => {
  const {data = []} = useQuery({
    queryKey: ['extraIngredients'],
    queryFn: getExtraIngredients,
  });
  const {currentOrder, updateCurrentOrder} = useOrderStore();

  const {t} = useTranslation('home');

  const handleOnChange = useCallback(
    (id: string, checked: boolean) => {
      const selectedIngredient = data.find(
        ingredient => ingredient.id === Number(id),
      );
      if (!selectedIngredient) {
        return;
      }

      if (!checked) {
        updateCurrentOrder({
          extraIngredients: [
            ...(currentOrder?.extraIngredients || []),
            selectedIngredient,
          ],
        });
      } else {
        updateCurrentOrder({
          extraIngredients: (currentOrder?.extraIngredients || []).filter(
            ingredient => ingredient.id !== Number(id),
          ),
        });
      }
    },
    [currentOrder?.extraIngredients, data, updateCurrentOrder],
  );

  const extraIngredientsPrice = useMemo(
    () =>
      currentOrder?.extraIngredients
        ?.map(({price}) => price)
        .reduce((price = 0, a = 0) => price + a, 0) || 0,
    [currentOrder?.extraIngredients],
  );

  return (
    <>
      <Card>
        <CheckBoxGroup
          title={t('step3.title')}
          subtitle={t('step3.description')}
          selected={
            currentOrder?.extraIngredients?.map(({id}) => String(id)) || []
          }
          options={data.map(({id, name, currency, price}) => ({
            value: String(id),
            label: `${name} - ${currency}${price.toFixed(2)}`,
          }))}
          onChange={handleOnChange}
        />
      </Card>

      <Card style={styles.card}>
        <View style={styles.regularPrice}>
          <Text style={styles.text}>{t('step3.regularPrice')}:</Text>
          <Text style={styles.priceText}>{`${
            currentOrder?.size?.currency
          }${currentOrder?.size?.price.toFixed(2)}`}</Text>
        </View>

        {!!extraIngredientsPrice && (
          <View style={styles.extraIngredientsPrice}>
            <Text style={[styles.text, styles.primaryText]}>
              {t('step3.extraIngredientsPrice')}:
            </Text>
            <Text style={[styles.priceText, styles.primaryText]}>
              {`${currentOrder?.size?.currency}${(
                (currentOrder?.size?.price || 0) + extraIngredientsPrice
              ).toFixed(2)}`}
            </Text>
          </View>
        )}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 0,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    fontFamily: getFontFamily('normal'),
    color: colors.secondary,
  },
  primaryText: {
    color: colors.primary,
  },
  priceText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -1,
    fontFamily: getFontFamily('bold'),
  },
  regularPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extraIngredientsPrice: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Step3;
