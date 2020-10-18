import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button, Layout, MenuItem, Divider, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { News } from '../screens/News';
import { Post } from '../screens/news/Post';
import { Keyword } from '../screens/news/Keyword';
import { Edit } from '../screens/news/Edit';
import { DetailList } from '../screens/news/DetailList';

const { Navigator, Screen } = createStackNavigator();


const KeywordIcon = (props) => (
  <Icon name='list-outline'  style={styles.icon}/>
);
const keyword = () => (
  <TopNavigationAction icon={ListIcon}/>
);
const PostIcon = (props) => (
  <Icon name='plus-outline'  style={styles.icon}/>
);
const postNews = () => (
  <TopNavigationAction icon={PostIcon}/>
);


const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const NewsNavigator = () => (
  <Navigator>
    <Screen name='News' 
    component={News}
    options={({ navigation, route }) => ({
      headerTitle: '뉴스',
      headerShown: 'none',
      title: '뉴스',
      headerLeft: () => (
        <TopNavigationAction icon={KeywordIcon}  style={styles.icon} onPress={() => {navigation.navigate('Keyword')}}/>
      ),
      headerRight: () => (
        <TopNavigationAction icon={PostIcon}  style={styles.icon} onPress={() => {navigation.navigate('Post')}}/>
      ),
      headerTitleAlign:"center"
      })}
    />
    <Screen name='Post' component={Post}/>
    <Screen name='Keyword' component={Keyword}/>
    <Screen name='Edit' component={Edit}/>
    <Screen name='DetailList' component={DetailList}/>
  </Navigator>
);

export const NewsNavigation = (props) => {
  return (
    
      <NewsNavigator {...props}/>
    
  )

  // return (
  //   <SafeAreaView style={styles.container}>
  //   <TopNavigation
  //     alignment='center'
  //     title='뉴스'
  //     subtitle='키워드'
  //     accessoryLeft={keyword}
  //     accessoryRight={postNews}
  //   />
  //   <Divider/>
  //   <NewsNavigator/>
  // </SafeAreaView>
  // )
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