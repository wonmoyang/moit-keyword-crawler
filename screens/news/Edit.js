import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Text, Divider, Layout, TopNavigation } from '@ui-kitten/components';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("keyword_crawler.db");

export const Edit = ({ navigation, route }) => {

  const [data, setData] = React.useState('');
  const { id } = route.params;

  React.useEffect(() => {
    selectKeyword(id);
  }, [id]);

  const selectKeyword = (id) => {
    db.transaction(
        tx => {
            tx.executeSql("SELECT * FROM keyword WHERE id IN(?)", [id], (_, { rows }) => {
            setData(rows.item(0));
            });
        },
        null
    );
}

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
     
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Button onPress={navigateDetails}>{data.name}</Button>
      </Layout>
    </SafeAreaView>
  );
};