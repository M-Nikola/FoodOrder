import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Order} from '@api/models';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

import EditIcon from '@assets/icons/edit.svg';

type OrderProps = {
  order: Order;
  onEditPress: () => void;
};

const OrderItem = memo(({order, onEditPress}: OrderProps) => {
  const {t} = useTranslation('checkout');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.row, styles.nameFlex]}>
          <TouchableOpacity style={styles.edit} onPress={onEditPress}>
            <EditIcon width={20} height={20} color={colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.text}>{order.bowl.name}</Text>
        </View>
        <Text style={[styles.text, styles.priceFlex]}>x{order.count}</Text>
        <Text style={[styles.text, styles.priceFlex, styles.alignRight]}>
          {order.size.currency}
          {order.size.price.toFixed(2)}
        </Text>
      </View>
      {!!order.extraIngredients?.length && (
        <View style={styles.extraIngredients}>
          <Text style={styles.text}>{t('with')}</Text>
          {order.extraIngredients?.map(extra => (
            <View key={extra.id} style={[styles.row, styles.extra]}>
              <Text style={styles.text}>{extra.name}</Text>
              <Text style={styles.text}>
                {extra.currency}
                {extra.price}
              </Text>
            </View>
          ))}
        </View>
      )}
      <Text style={styles.alignRight}>{t('freeDelivery')}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  edit: {marginRight: 10},
  extraIngredients: {marginLeft: 20, marginTop: 10},
  text: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: getFontFamily('normal'),
    lineHeight: 24,
    letterSpacing: -0.4,
    color: colors.secondary,
  },
  nameFlex: {flex: 3, justifyContent: 'flex-start'},
  priceFlex: {flex: 1},
  alignRight: {
    textAlign: 'right',
  },
  ingredients: {
    marginLeft: 15,
    marginBottom: 5,
  },
  extra: {justifyContent: 'space-between'},
});

export default OrderItem;
