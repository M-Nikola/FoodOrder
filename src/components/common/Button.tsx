import React, {ReactNode, memo} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

import ArrowIcon from '@assets/icons/arrow.svg';

export enum ButtonVariant {
  primary,
  secondary,
  outlined,
}

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
  isNext?: boolean;
  disabled?: boolean;
  text?: String;
  children?: ReactNode;
  onPress: () => void;
};

const getVariantStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case ButtonVariant.outlined:
      return styles.outlineContainer;
    case ButtonVariant.secondary:
      return styles.secondaryContainer;
    default:
      return {};
  }
};

const Button = ({
  style,
  variant = ButtonVariant.primary,
  isNext = false,
  disabled = false,
  text,
  children,
  onPress,
}: ButtonProps) => {
  const isNotOutlined = variant !== ButtonVariant.outlined;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getVariantStyle(variant),
        style,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
      onPress={onPress}>
      {!!text && (
        <Text style={[styles.text, isNotOutlined && {color: colors.white}]}>
          {text}
        </Text>
      )}
      {children}
      {isNext && (
        <View style={styles.arrowContainer}>
          <ArrowIcon
            width={16}
            height={16}
            color={isNotOutlined ? colors.white : colors.secondary}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    minWidth: 40,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: getFontFamily('bold'),
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
    borderWidth: 0,
  },
  outlineContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: 'transparent',
  },
  arrowContainer: {
    position: 'absolute',
    right: 12,
    alignSelf: 'center',
  },
});

export default Button;
