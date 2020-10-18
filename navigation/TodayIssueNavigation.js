import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, TopNavigationAction } from '@ui-kitten/components';

import { TodayIssue } from '../screens/TodayIssue';

const { Navigator, Screen } = createStackNavigator();


const TodayIssueNavigator = () => (
  <Navigator>
    <Screen name='News' 
    component={TodayIssue}
    options={({ navigation, route }) => ({
      headerTitle: '오늘의 이슈',
      headerShown: 'none',
      headerTitleAlign:"center"
      })}
    />
  </Navigator>
);

export const TodayIssueNavigation = (props) => {
  return (
      <TodayIssueNavigator {...props}/>  
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 50
  },
  icon: {
    height: 35,
    tintColor: "#222B45",
    width: 35
  }
});