import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Button, ButtonVariant, Card} from '@components/common';
import Counter from './Counter';
import {Order} from '@api/index';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

import TrashIcon from '@assets/icons/trash.svg';

type OrderCardProps = {
  style?: StyleProp<ViewStyle>;
  index: number;
  data: Order;
  onDeletePress: (id: number) => void;
  onCountChange: (count: number) => void;
};

const OrderCard = ({
  style,
  index,
  data,
  onDeletePress,
  onCountChange,
}: OrderCardProps) => {
  const totalPrice = useMemo(
    () =>
      (data.size?.price || 0) +
      (data?.extraIngredients
        ?.map(({price}) => price)
        .reduce((sum = 0, a = 0) => sum + a, 0) || 0),
    [data.size, data?.extraIngredients],
  );

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.row}>
        <Text style={styles.title}>{data.bowl.name}</Text>
        <Text style={styles.title}>
          {data.size.currency}
          {totalPrice}
        </Text>
      </View>
      <Text style={[styles.subtitle, styles.spacingMedium]}>
        {data.size.name}
      </Text>
      <Text style={styles.subtitle}>{data.base.name}</Text>
      <Text style={styles.subtitle}>{data.sauce.name}</Text>
      <Text style={styles.subtitle}>
        {data.ingredients?.map(({name}) => name).join(', ')}
      </Text>
      {data.extraIngredients?.map(({name, currency, price}) => (
        <Text
          key={name}
          style={styles.subtitle}>{`${name} +${currency}${price}`}</Text>
      ))}
      <View style={[styles.row, styles.spacingBig]}>
        <Button
          variant={ButtonVariant.outlined}
          onPress={() => onDeletePress(index)}>
          <TrashIcon width={24} height={24} color={colors.secondary} />
        </Button>

        <Counter count={data.count} onCountChange={onCountChange} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
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
});

export default OrderCard;
