import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  isFocused?: boolean;
  label: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChangeText: (value: string) => void;
}

const Input = ({
  style,
  isRequired = true,
  isFocused,
  multiline = false,
  label,
  placeholder,
  error,
  value,
  onChangeText,
  ...props
}: InputProps) => (
  <View style={[styles.container, style]}>
    <Text style={styles.label}>
      {label}
      {isRequired && <Text style={styles.required}>*</Text>}
    </Text>
    <TextInput
      style={[
        styles.input,
        isFocused && styles.focused,
        multiline && styles.multiline,
      ]}
      multiline={multiline}
      placeholder={placeholder}
      placeholderTextColor={colors.secondaryLight}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
    {!!error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
  input: {
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
  focused: {
    borderColor: colors.primary,
  },
  multiline: {
    height: 150,
  },
  error: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: getFontFamily('normal'),
    color: colors.red,
  },
});
export default Input;
