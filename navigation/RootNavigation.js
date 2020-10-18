import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../home.component';
import { Detail } from '../screens/news/Detail';
import { DetailsScreen } from '../details.component';
import { TabNavigation } from './TabNavigation';

import { navigationRef } from './NavigationRef';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name='Main' component={TabNavigation}/>
    <Screen name='Details' component={DetailsScreen}/>
    <Screen name='Detail' component={Detail}/>
  </Navigator>
);

export const RootNavigation = () => (
  <NavigationContainer ref={navigationRef}>
    <HomeNavigator/>
  </NavigationContainer>
);