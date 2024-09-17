import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

import CheckIcon from '@assets/icons/check.svg';

type CheckBoxProps = {
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  checked: boolean;
  text: String;
  onPress: () => void;
};

const CheckBox = ({style, disabled, checked, text, onPress}: CheckBoxProps) => (
  <TouchableOpacity
    style={[styles.container, style, disabled && styles.disabledContainer]}
    disabled={disabled}
    onPress={onPress}>
    <View style={[styles.boxContainer, checked && styles.checkedBoxContainer]}>
      {checked && <CheckIcon width={16} height={16} color={colors.white} />}
    </View>

    <Text style={[styles.text, checked && styles.checkedText]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 25,
    height: 25,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  checkedBoxContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  text: {
    fontFamily: getFontFamily('bold'),
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: colors.secondary,
  },
  checkedText: {
    color: colors.primary,
  },
});

export default CheckBox;
