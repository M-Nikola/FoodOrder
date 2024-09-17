import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

type RadioButtonProps = {
  style?: StyleProp<ViewStyle>;
  checked: boolean;
  text: String;
  onPress: () => void;
};
const RadioButton = ({style, checked, text, onPress}: RadioButtonProps) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    <View
      style={[
        styles.circleContainer,
        checked && {borderColor: colors.primary},
      ]}>
      {checked && <View style={styles.circle} />}
    </View>
    <Text style={[styles.text, checked && {color: colors.primary}]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: colors.primary,
  },
  text: {
    fontFamily: getFontFamily('bold'),
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: colors.secondary,
  },
});

export default RadioButton;
