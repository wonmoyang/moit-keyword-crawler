import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, TopNavigationAction } from '@ui-kitten/components';

import { RealTimeList } from '../screens/RealTimeList';

const { Navigator, Screen } = createStackNavigator();


const RealTimeListNavigator = () => (
  <Navigator>
    <Screen name='News' 
    component={RealTimeList}
    options={({ navigation, route }) => ({
      headerTitle: '급상승 검색어',
      headerShown: 'none',
      headerTitleAlign:"center"
      })}
    />
  </Navigator>
);

export const RealTimeListNavigation = (props) => {
  return (
      <RealTimeListNavigator {...props}/>  
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