import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);


import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Detail" component={Detail2} />
    </Stack.Navigator>
  );
}

export const Detail = ({ navigation, route }) => {

  const comp = ({}) => (
    <WebView
    originWhitelist={['*']}
    source={{uri: route.params.uri}}
    />
  )

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Detail" 
        component={comp} 
        options={({ navigation, route }) => ({
          headerTitle: '상세보기',
          headerBackTitle: '목록',
          headerTitleAlign:"center"
          })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  input: {
    flex:1,
    fontSize: 17,
    marginTop: 50
  },
  icon: {
    height: 35,
    tintColor: "#222B45",
    width: 35
  }
});