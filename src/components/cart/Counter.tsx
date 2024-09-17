import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, ButtonVariant} from '@components/common';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

import ArrowUpIcon from '@assets/icons/arrow-up.svg';
import ArrowDownIcon from '@assets/icons/arrow-down.svg';

type CounterProps = {
  count: number;
  onCountChange: (count: number) => void;
};

const Counter = ({count, onCountChange}: CounterProps) => (
  <View style={styles.container}>
    <Button
      style={styles.decrementButton}
      disabled={count <= 1}
      variant={ButtonVariant.outlined}
      onPress={() => onCountChange(count - 1)}>
      <ArrowDownIcon width={16} height={16} color={colors.secondary} />
    </Button>
    <View style={styles.counter}>
      <Text style={styles.text}>{count}</Text>
    </View>
    <Button
      style={styles.incrementButton}
      variant={ButtonVariant.outlined}
      onPress={() => onCountChange(count + 1)}>
      <ArrowUpIcon width={16} height={16} color={colors.secondary} />
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  decrementButton: {
    backgroundColor: colors.gray,
    borderColor: colors.gray,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  incrementButton: {
    backgroundColor: colors.gray,
    borderColor: colors.gray,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  counter: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: getFontFamily('normal'),
    color: colors.secondary,
  },
});

export default Counter;
