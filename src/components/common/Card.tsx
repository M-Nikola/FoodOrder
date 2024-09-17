import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import colors from '@utils/colors';

type CardProps = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

const Card = ({style, children}: CardProps) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    padding: 15,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
});

export default Card;
