import React, {memo} from 'react';
import {View, StyleSheet, Text, StyleProp, ViewStyle} from 'react-native';
import {RadioButton} from '@components/common';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

type RadioButtonGroupProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
  selected: string | undefined;
  options: {value: string; label: string}[];
  onChange: (value: string) => void;
};

const RadioButtonGroup = memo(
  ({
    style,
    title,
    subtitle,
    selected,
    options,
    onChange,
  }: RadioButtonGroupProps) => (
    <View style={style}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {options.map(({value, label}, index) => (
        <RadioButton
          key={value}
          style={index !== options.length - 1 && styles.spacing}
          checked={selected === value}
          text={label}
          onPress={() => onChange(value)}
        />
      ))}
    </View>
  ),
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: getFontFamily('bold'),
    lineHeight: 24,
    letterSpacing: -1,
    color: colors.secondary,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: getFontFamily('medium'),
    lineHeight: 24,
    letterSpacing: -0.4,
    color: colors.secondary,
    marginBottom: 20,
  },
  spacing: {
    marginBottom: 10,
  },
});

export default RadioButtonGroup;
