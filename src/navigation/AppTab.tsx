import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {HomeScreen} from '@screens/index';
import {CartStack} from '@navigation/index';
import {Logo, ToggleLanguage} from '@components/common';
import {useOrderStore} from '@stores/order';
import colors from '@utils/colors';

import HomeIcon from '@assets/icons/home.svg';
import CartIcon from '@assets/icons/shopping-cart.svg';

const Tab = createBottomTabNavigator();

const HomeTabBarIcon = ({color}: {color: string}) => <HomeIcon color={color} />;
const CartTabBarIcon = ({color}: {color: string}) => <CartIcon color={color} />;
const HeaderLeft = () => <ToggleLanguage />;

const AppTab = () => {
  const {cart} = useOrderStore();
  const {t} = useTranslation(['home', 'cart']);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: HomeTabBarIcon,
          headerRight: Logo,
          headerLeft: HeaderLeft,
          headerTitle: '',
          headerLeftContainerStyle: {paddingLeft: 20},
          headerRightContainerStyle: {paddingRight: 20},
          title: t('home:home'),
        }}
        name="HomeTab"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: CartTabBarIcon,
          tabBarBadge: cart.length || undefined,
          headerShown: false,
          title: t('cart:cart'),
        }}
        name="CartTab"
        component={CartStack}
      />
    </Tab.Navigator>
  );
};

export default AppTab;
