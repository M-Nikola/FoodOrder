import React, {useMemo} from 'react';
import {Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {OrderCard, OrderTotal, CartEmpty} from '@components/cart';
import {useOrderStore} from '@stores/order';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

const CartScreen = () => {
  const {cart, removeFromCart, updateOrderCount} = useOrderStore();
  const navigation = useNavigation();
  const {t} = useTranslation('cart');

  const subtotal = useMemo(
    () =>
      cart
        .map(
          order =>
            (order.size.price +
              (order.extraIngredients
                ?.map(({price}) => price)
                .reduce((sum = 0, a = 0) => sum + a, 0) || 0)) *
            order.count,
        )
        .reduce((sum = 0, a = 0) => sum + a, 0),
    [cart],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, styles.spacingBig]}>{t('cart')}</Text>
      {!cart.length && <CartEmpty />}
      {!!cart.length && (
        <ScrollView alwaysBounceVertical={false}>
          {cart.map((order, index) => (
            <OrderCard
              key={index}
              index={index}
              data={order}
              onCountChange={count => updateOrderCount(index, count)}
              onDeletePress={() => removeFromCart(index)}
            />
          ))}
          <OrderTotal
            subtotal={subtotal}
            deliveryFee={0}
            currency={cart[0].size.currency}
            onOrderMore={() => navigation.navigate('HomeTab')}
            onProceedToCheckout={() => navigation.navigate('Checkout')}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: getFontFamily('bold'),
    lineHeight: 24,
    letterSpacing: -1,
    color: colors.secondary,
  },
  spacingBig: {
    marginTop: 20,
  },
});

export default CartScreen;
