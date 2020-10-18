import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { DetailsScreen } from '../details.component';
import { Button, Layout, Tab, TabBar, TabView, Text } from '@ui-kitten/components';

import { List } from './news/List.js'

  const TabBarSimpleUsageShowcase = (props) => {
  
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
      <TabView style={styles.tabView}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>

        <Tab title='목록' style={styles.tab}>
          <List {...props}/>
        </Tab>
        <Tab title='스크랩' style={styles.tab}>
          <Layout style={styles.tabContainer}>
            <Text category='h5'>스크랩</Text>
          </Layout>
        </Tab>

      </TabView>
    );
  };

export const News = (props) => {

  const { navigation, route } = props;

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
      <Layout style={{ flex: 1 }}>
        <TabBarSimpleUsageShowcase {...props}/>
      </Layout>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      fontSize: 50,
      
    },
    tabView: {
      flex:1
    },
    tab: {
      flex:1,
      height: 30
    },
    tabContainer: {
      flex:1,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    container2: {
      flex: 1,
      flexDirection: 'row',
    },
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
});