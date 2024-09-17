import React, {memo} from 'react';
import {View, StyleSheet, Text, StyleProp, ViewStyle} from 'react-native';
import {CheckBox} from '@components/common';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

type CheckBoxGroupProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
  selected: string[] | undefined;
  maxSelected?: number;
  options: {value: string; label: string}[];
  onChange: (value: string, checked: boolean) => void;
};

const CheckBoxGroup = memo(
  ({
    style,
    title,
    subtitle,
    selected,
    maxSelected,
    options,
    onChange,
  }: CheckBoxGroupProps) => (
    <View style={style}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {options.map(({value, label}, index) => {
        const isChecked =
          selected?.findIndex(selectedValue => selectedValue === value) !== -1;

        return (
          <CheckBox
            key={value}
            disabled={
              !!maxSelected && selected?.length === maxSelected && !isChecked
            }
            style={index !== options.length - 1 && styles.spacing}
            checked={isChecked}
            text={label}
            onPress={() => onChange(value, isChecked)}
          />
        );
      })}
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

export default CheckBoxGroup;
