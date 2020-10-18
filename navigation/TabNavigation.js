import React from 'react';
import { Icon, Layout, Text } from '@ui-kitten/components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { Button } from '@ui-kitten/components';

import { HomeScreen } from '../home.component';
import { DetailsScreen } from '../details.component';
import { News } from '../screens/News';
import { NewsNavigation } from './NewsNavigation';
import { RealTimeListNavigation } from './RealTimeListNavigation';
import { TodayIssueNavigation } from './TodayIssueNavigation';

const { Navigator, Screen } = createBottomTabNavigator();

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={PersonIcon} title='News'/>
      <BottomNavigationTab icon={BellIcon} title='Realtime List'/>
      <BottomNavigationTab icon={BellIcon} title='Today Issue'/>
      <BottomNavigationTab icon={BellIcon} title='ORDERS2'/>
      <BottomNavigationTab icon={EmailIcon} title='TRANSACTIONS'/>
    </BottomNavigation>
  );

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='NewsNavigation'  component={NewsNavigation}/>
    <Screen name='RealtimeList' component={RealTimeListNavigation}/>
    <Screen name='TodayIssue' component={TodayIssueNavigation}/>
    <Screen name='Blog2' component={OrdersScreen}/>
    <Screen name='Setting' component={DetailsScreen}/>
  </Navigator>
);

const PersonIcon = (props) => (
    <Icon {...props} name='grid-outline'/>
  );
  
  const BellIcon = (props) => (
    <Icon {...props} name='book-outline'/>
  );
  
  const EmailIcon = (props) => (
    <Icon {...props} name='settings-outline'/>
  );

export const TabNavigation = ({ navigation }) => {
  return (
    <TabNavigator/>
  );
};