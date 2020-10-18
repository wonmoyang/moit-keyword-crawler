import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input, TopNavigationAction } from '@ui-kitten/components';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("keyword_crawler.db");

export const Post = ({ navigation }) => {

  const [value, setValue] = React.useState('');

  const SaveIcon = (props) => {
    return <Icon name='checkmark-outline' style={styles.icon}/>
  }

    // 테이블 생성
    db.transaction(tx => {
      tx.executeSql(
        "CREATE table IF NOT EXISTS keyword (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
      );
    });

    // 키워드 저장
    const goSave = (e) => {
      e.preventDefault();

      if(value.trim().toString() === ''){
        alert('키워드를 입력해주세요.');
        return null;
      }

      db.transaction(
        tx => {
          tx.executeSql("INSERT INTO keyword (name) values (?)", [value], (_, { result }) => {
            navigation.navigate('NewsNavigation', {
              screen: 'News',
              params: { keyword: value }
            });
          });
          tx.executeSql("SELECT * FROM keyword", [], (_, { rows }) => {
            console.log(JSON.stringify(rows))
          });
        },
        null
      );
    }

  React.useLayoutEffect(() => {
    debugger;
    navigation.setOptions({
      headerRight: () => (
        <TopNavigationAction icon={SaveIcon} style={styles.icon} onPress={(e) => {goSave(e)}}/>
      ),
      title: "뉴스 키워드"
    });
  }, [navigation, value]);

  return (
    
      <Input style={styles.input}
        label='키워드'
        placeholder='키워드 입력'
        autoFocus={true}
        
        clearButtonMode={'always'}
        value={value}
        onChangeText={e => setValue(e)}
      />    
  );
};

const styles = StyleSheet.create({
  input: {
    flex:1,
    fontSize: 17,
    marginTop: 10
  },
  icon: {
    height: 35,
    tintColor: "#222B45",
    width: 35
  }
});