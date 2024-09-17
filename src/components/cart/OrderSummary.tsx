import React, {useCallback, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Card} from '@components/common';
import OrderItem from './OrderItem';
import {Order} from '@api/models';
import {useOrderStore} from '@stores/order';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

const OrderSummary = () => {
  const {cart, setEditOrderIndex, updateCurrentOrder} = useOrderStore();
  const navigation = useNavigation();
  const {t} = useTranslation('checkout');

  const totalPrice = useMemo(
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

  const handleOnEditPress = useCallback(
    (index: number, order: Order) => {
      setEditOrderIndex(index);
      updateCurrentOrder(order);
      navigation.navigate('HomeTab');
    },
    [navigation, setEditOrderIndex, updateCurrentOrder],
  );

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{t('orderSummary')}</Text>
      {cart.map((order, index) => (
        <OrderItem
          key={String(index)}
          order={order}
          onEditPress={() => handleOnEditPress(index, order)}
        />
      ))}
      <View style={[styles.row, styles.fullPrice]}>
        <Text style={[styles.text, styles.primaryText]}>{t('total')}</Text>
        <Text style={[styles.title, styles.primaryText]}>
          ${totalPrice.toFixed(2)}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: getFontFamily('bold'),
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -1,
    color: colors.secondary,
    marginBottom: 10,
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
  alignRight: {
    textAlign: 'right',
  },
  fullPrice: {
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: colors.gray,
  },
});

export default OrderSummary;
