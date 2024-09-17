import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Card, CheckBoxGroup, RadioButtonGroup} from '@components/common';
import {getBases, getIngredients, getSauces, getSizes} from '@api/index';
import {getFontFamily} from '@utils/fonts';
import {useOrderStore} from '@stores/order';
import colors from '@utils/colors';

const Step2 = () => {
  const {data: sizes = []} = useQuery({queryKey: ['sizes'], queryFn: getSizes});
  const {data: bases = []} = useQuery({queryKey: ['bases'], queryFn: getBases});
  const {data: sauces = []} = useQuery({
    queryKey: ['sauces'],
    queryFn: getSauces,
  });
  const {data: ingredients = []} = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  });

  const {t} = useTranslation('home');

  const {currentOrder, updateCurrentOrder} = useOrderStore();

  const handleOnSizeChange = useCallback(
    (id: string) => {
      updateCurrentOrder({
        size:
          currentOrder?.size?.id === Number(id)
            ? undefined
            : sizes.find(size => size.id === Number(id)),
      });
    },
    [currentOrder?.size?.id, sizes, updateCurrentOrder],
  );

  const handleOnBaseChange = useCallback(
    (id: string) => {
      updateCurrentOrder({
        base:
          currentOrder?.base?.id === Number(id)
            ? undefined
            : bases.find(base => base.id === Number(id)),
      });
    },
    [bases, currentOrder?.base?.id, updateCurrentOrder],
  );

  const handleOnSauceChange = useCallback(
    (id: string) => {
      updateCurrentOrder({
        sauce:
          currentOrder?.sauce?.id === Number(id)
            ? undefined
            : sauces.find(sauce => sauce.id === Number(id)),
      });
    },
    [currentOrder?.sauce?.id, sauces, updateCurrentOrder],
  );

  const handleOnIngredientsChange = useCallback(
    (id: string, checked: boolean) => {
      const selectedIngredient = ingredients.find(
        ingredient => ingredient.id === Number(id),
      );
      if (!selectedIngredient) {
        return;
      }

      if (!checked) {
        updateCurrentOrder({
          ingredients: [
            ...(currentOrder?.ingredients || []),
            selectedIngredient,
          ],
        });
      } else {
        updateCurrentOrder({
          ingredients: (currentOrder?.ingredients || []).filter(
            ingredient => ingredient.id !== Number(id),
          ),
        });
      }
    },
    [currentOrder?.ingredients, ingredients, updateCurrentOrder],
  );

  const sizesOptions = useMemo(
    () =>
      sizes.map(({id, name, currency, price}) => ({
        value: String(id),
        label: `${name} - ${currency}${price.toFixed(2)}`,
      })),
    [sizes],
  );

  const basesOptions = useMemo(
    () =>
      bases.map(({id, name}) => ({
        value: String(id),
        label: name,
      })),
    [bases],
  );

  const soucesOptions = useMemo(
    () =>
      sauces.map(({id, name}) => ({
        value: String(id),
        label: name,
      })),
    [sauces],
  );

  const maxIngredients = useMemo(() => {
    const currentSizeIndex = sizes.findIndex(
      ({id}) => id === Number(currentOrder?.size?.id),
    );
    switch (currentSizeIndex) {
      case 0:
        return 5;
      case 1:
        return 8;
      case 2:
        return 10;
    }
  }, [sizes, currentOrder?.size?.id]);

  return (
    <Card>
      <RadioButtonGroup
        title={t('step2.pickSize')}
        style={styles.spacing}
        selected={String(currentOrder?.size?.id)}
        options={sizesOptions}
        onChange={handleOnSizeChange}
      />

      <RadioButtonGroup
        style={styles.spacing}
        title={t('step2.pickBase')}
        selected={String(currentOrder?.base?.id)}
        options={basesOptions}
        onChange={handleOnBaseChange}
      />

      <RadioButtonGroup
        style={styles.spacing}
        title={t('step2.pickSauce')}
        selected={String(currentOrder?.sauce?.id)}
        options={soucesOptions}
        onChange={handleOnSauceChange}
      />

      <CheckBoxGroup
        style={styles.spacing}
        title={t('step2.pickIngredients')}
        subtitle={t('step2.pickIngredientsDescription')}
        maxSelected={maxIngredients}
        selected={currentOrder?.ingredients?.map(({id}) => String(id)) || []}
        options={ingredients.map(({id, name}) => ({
          value: String(id),
          label: name,
        }))}
        onChange={handleOnIngredientsChange}
      />

      {maxIngredients &&
        maxIngredients === currentOrder?.ingredients?.length && (
          <Text style={styles.text}>
            <Text style={{color: colors.primary}}>* </Text>
            {t('step2.maximumIngredients')}
          </Text>
        )}
    </Card>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: getFontFamily('medium'),
    lineHeight: 24,
    letterSpacing: -0.4,
    color: colors.secondary,
  },
  spacing: {
    marginBottom: 20,
  },
});

export default Step2;
