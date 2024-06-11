import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import * as Screens from 'screens';

import {Routes} from './Routes';
import {navigationRef} from './NavigationService';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'theme';
import Icon from 'assets/svg/TabIcon';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          return Icon[`${route?.name}`]({color}) ?? '';
        },
        tabBarLabel: `${t((route?.name ?? '').toLowerCase())}`,
        headerShown: false,
        tabBarActiveTintColor: Colors.mainLight,
        tabBarInactiveTintColor: Colors.border,
      })}>
      <Tab.Screen name={Routes.Home} component={Screens.Home} />
      <Tab.Screen name={Routes.Statistic} component={Screens.Statistic} />
      <Tab.Screen name={Routes.Transaction} component={Screens.Transaction} />
      <Tab.Screen name={Routes.Account} component={Screens.Account} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

/**
 * @description define stack navigator when the user has not been authenticated
 * @returns {any}
 */

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, animation: 'slide_from_right'}}
    initialRouteName={Routes.Intro}>
    <Stack.Screen name={Routes.Intro} component={Screens.Intro} />
    <Stack.Screen name={Routes.Login} component={Screens.Login} />
    <Stack.Screen name={Routes.Register} component={Screens.Register} />
    <Stack.Screen name={Routes.OTP} component={Screens.OTP} />
    <Stack.Screen name={Routes.KYC} component={Screens.KYC} />
    <Stack.Screen
      name={Routes.InputPassword}
      component={Screens.InputPassword}
    />
    <Stack.Screen
      name={Routes.ResetPassword}
      component={Screens.ResetPassword}
    />
    <Stack.Screen name={Routes.HomeTabs} component={HomeTabs} />
    <Stack.Screen
      name={Routes.SponsoredList}
      component={Screens.SponsoredList}
    />
    <Stack.Screen
      name={Routes.SponsoredDetail}
      component={Screens.SponsoredDetail}
    />
    <Stack.Screen name={Routes.ListDriver} component={Screens.ListDriver} />
    <Stack.Screen
      name={Routes.GroupDriverDetail}
      component={Screens.GroupDriverDetail}
    />
    <Stack.Screen name={Routes.DriverCustom} component={Screens.DriverCustom} />
    <Stack.Screen name={Routes.ChatDetail} component={Screens.ChatDetail} />
    <Stack.Screen name={Routes.ChatCustom} component={Screens.ChatCustom} />
    <Stack.Screen name={Routes.Chat} component={Screens.Chat} />
    <Stack.Screen name={Routes.Notification} component={Screens.Notification} />
    <Stack.Screen name={Routes.ListChat} component={Screens.ListChat} />
    <Stack.Screen name={Routes.ProvinceList} component={Screens.ProvinceList} />
    <Stack.Screen name={Routes.Vote} component={Screens.Vote} />
    <Stack.Screen name={Routes.DriveDetail} component={Screens.DriveDetail} />
    <Stack.Screen name={Routes.MemberList} component={Screens.MemberList} />
    <Stack.Screen
      name={Routes.RequestDelete}
      component={Screens.RequestDelete}
    />
    <Stack.Screen name={Routes.Contact} component={Screens.Contact} />
    <Stack.Screen name={Routes.AccountInfo} component={Screens.AccountInfo} />
    <Stack.Screen name={Routes.Policy} component={Screens.Policy} />
    <Stack.Screen name={Routes.Term} component={Screens.Term} />
    <Stack.Screen
      name={Routes.ChangePassword}
      component={Screens.ChangePassword}
    />
    <Stack.Screen name={Routes.BalanceInfo} component={Screens.BalanceInfo} />
    <Stack.Screen name={Routes.Recharge} component={Screens.Recharge} />
    <Stack.Screen
      name={Routes.RequestSupport}
      component={Screens.RequestSupport}
    />
    <Stack.Screen name={Routes.BankTransfer} component={Screens.BankTransfer} />
    <Stack.Screen name={Routes.ResearchFn} component={Screens.ResearchFn} />
  </Stack.Navigator>
);

/**
 * @description define stack navigator when the user has authenticated
 * @returns {any}
 */
// const AuthNavigator = () => (
//   <Stack.Navigator
//     initialRouteName={Routes.Home}
//     screenOptions={{headerShown: false}}>
//     <Stack.Screen name={Routes.Home} component={Screens.Home} />
//   </Stack.Navigator>
// );

/**
 * @description define the navigator container check whether the user is authenticated or not
 * @returns {any}
 */
export const Navigator = () => {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
};
