import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartScreen, CheckoutScreen} from '@screens/index';
import {Logo, ToggleLanguage} from '@components/common';
import colors from '@utils/colors';

const Stack = createNativeStackNavigator();

const HeaderLeft = () => <ToggleLanguage />;

const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: '',
      headerRight: Logo,
      headerLeft: HeaderLeft,
      headerTintColor: colors.primary,
    }}>
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

export default CartStack;
