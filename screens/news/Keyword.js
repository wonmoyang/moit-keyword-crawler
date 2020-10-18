import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    SafeAreaView,
    ScrollView,
    RefreshControl
} from 'react-native';
import { Text, ListItem, Icon, Button } from '@ui-kitten/components';
import { HeaderBackButton } from '@react-navigation/stack';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("keyword_crawler.db");

export const Keyword = ({navigation}) => {
    const [listData, setListData] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState();

    React.useEffect(() => {
        selectAll();
      }, []);

    React.useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: (props) => (
            <HeaderBackButton
                {...props}
                onPress={() => {
                    navigation.navigate('NewsNavigation', {
                        screen: 'News',
                        params: { keyword: deleteItem }
                      });
                }}
            />
        ),
        title: "뉴스 키워드"
    });
    }, [deleteItem]);

    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
  
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const selectAll = () => {
        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM keyword", [], (_, { rows }) => {
                console.log(JSON.stringify(rows))
                setListData(rows._array);
                });
            },
            null
        );
    }

    const goEdit = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        navigation.navigate('Edit', {id:rowKey});
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);

        db.transaction(
            tx => {
              tx.executeSql("DELETE FROM keyword WHERE id IN(?)", [rowKey], (_, { rows }) => {
                setDeleteItem(rowKey);
              });
            },
            null
          );

        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = (data, rowMap) => (
        <TouchableHighlight
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <ListItem 
                onPress={() => {goEdit(rowMap, data.item.id)}}
                style={{height:50}}
                title={data.item.name}
                //description={'fsafsa'}
                accessoryRight={MoreIcon}
            />
      </TouchableHighlight>
    );

    const StarIcon = (props) => {
        return <Icon name='star-outline' style={styles.icon}/>
    }

    const MoreIcon = (props) => {
        return <Icon name='more-vertical-outline' style={styles.icon}/>
    }


  const TrashIcon = (props) => {
      return <Icon name='trash-outline' style={styles.icon}/> 
  }

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Button
                onPress={() => {alert('즐겨찾기!')}} 
                style={{right:15, width:75, height:50 }} 
                status='warning' 
                accessoryLeft={StarIcon}/>
            <Button
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => {goEdit(rowMap, data.item.id)}}
            >
                <Text style={styles.backTextWhite}>Edit</Text>
            </Button>
            <Button
                onPress={() => deleteRow(rowMap, data.item.id)}
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                status={'danger'}
                accessoryLeft={TrashIcon}/>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <SwipeListView
                    keyExtractor={(listData, index) => {
                        return listData.id.toString();
                    }}
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onRowDidOpen}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        //borderBottomColor: 'gray',
        //borderBottomWidth: 1,
        justifyContent: 'center',
        //height: 50,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        //backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        //backgroundColor: 'red',
        right: 0,
    },
    backLeftBtn: {
        backgroundColor: 'yellow',
        width:75,
        //height:50,
        right:25,
        top:-15
    },
    icon: {
        height: 25,
        tintColor: "#222B45",
        width: 35
    }
});
