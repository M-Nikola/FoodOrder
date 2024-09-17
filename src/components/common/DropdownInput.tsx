import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

type DropdownInputProps = {
  data: {label: string; value: string}[];
  label: string;
  isRequired?: boolean;
  placeholder: string;
  error?: string;
  value: string;
  handleBlur: () => void;
  handleChange: (item: {label: string; value: string}) => void;
};

const DropdownInput = ({
  data,
  label,
  isRequired = true,
  placeholder,
  value,
  error,
  handleBlur,
  handleChange,
}: DropdownInputProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}
      {isRequired && <Text style={styles.required}>*</Text>}
    </Text>
    <Dropdown
      style={styles.dropdown}
      data={data}
      maxHeight={300}
      placeholder={placeholder}
      placeholderStyle={styles.placeholder}
      valueField={'value'}
      labelField={'label'}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
    />
    {!!error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {marginBottom: 20},
  dropdown: {
    height: 48,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: getFontFamily('normal'),
  },
  error: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: getFontFamily('normal'),
    color: colors.red,
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: getFontFamily('normal'),
  },
  required: {
    color: colors.red,
  },
  placeholder: {
    color: colors.secondaryLight,
  },
});

export default DropdownInput;
