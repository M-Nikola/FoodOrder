import React, {useCallback} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, ButtonVariant} from '@components/common';
import {DeliveryForm, OrderSummary} from '@components/cart';
import {createOrder} from '@api/functions';
import {PlaceOrder} from '@api/models';
import {useOrderStore} from '@stores/order';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const {cart, resetState} = useOrderStore();
  const {t} = useTranslation(['checkout', 'button']);

  const handlePlaceOrder = useCallback(async () => {
    try {
      const orders = cart.map(
        ({bowl, size, base, sauce, ingredients, extraIngredients}) =>
          ({
            bowlId: String(bowl.id),
            sizeId: String(size.id),
            baseId: String(base.id),
            sauceId: String(sauce.id),
            ingredients: ingredients?.map(({id}) => String(id)),
            extraIngredients: extraIngredients?.map(({id}) => String(id)),
          } as PlaceOrder),
      );
      await createOrder(orders);
      Alert.alert(t('checkout:order'), t('checkout:successfulOrder'), [
        {
          text: t('button:ok'),
          onPress: () => {
            resetState();
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeTab'}],
            });
          },
        },
      ]);
    } catch (e) {
      console.log({e});
    }
  }, [cart, navigation, resetState, t]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('checkout:title')}</Text>
      <ScrollView
        alwaysBounceHorizontal={false}
        showsVerticalScrollIndicator={false}>
        <DeliveryForm />
        <OrderSummary />
        <Button
          variant={ButtonVariant.outlined}
          text={t('button:backToCart')}
          onPress={() => navigation.goBack()}
        />
        <Button
          style={styles.button}
          text={t('button:placeOrder')}
          onPress={handlePlaceOrder}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: getFontFamily('bold'),
    lineHeight: 24,
    letterSpacing: -1,
    color: colors.secondary,
  },
  button: {marginVertical: 20},
});

export default CheckoutScreen;
