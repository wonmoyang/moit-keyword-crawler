import React from 'react';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Button, Avatar, ListItem, Divider } from '@ui-kitten/components';

import axios from 'axios';

import { NewsKeyword } from '../../component/NewsKeyword';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("keyword_crawler.db");

const InstallButton = (props) => (
<Button size='tiny'>
    INSTALL
</Button>
);
export const List = ({navigation, route}) => {

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [src, setSrc] = React.useState('');
    const [content, setContent] = React.useState('');
    const [list, setList] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const selectAll = () => {

      return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM keyword", [], (_, { rows }) => {
              let keyword = [];
              for (let i = 0; i < rows.length; i++) {
                keyword.push({
                  ...rows.item(i),
                });
              }
              setList(keyword);
              resolve(true);
          },[],
          (_, error) => { debugger; console.log(error); reject(error) },
          (_, success) => { debugger; resolve(success)}
        )
      })
    })

    };

    const onRefresh = React.useCallback( async () => {
      setRefreshing(true);
      await selectAll();
      setRefreshing(false);
    }, []);

    React.useEffect(() => {
        selectAll();
    }, [route.params?.keyword]);
    
  return (
    <ScrollView
      refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list.map((keyword) => (
        <>
        <NewsKeyword navigation={navigation} keyword={keyword}/>
        <Divider/>
        </>
      ))}
    </ScrollView>
  );
};