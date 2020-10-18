import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import { Text, Layout, LIstItem, Card } from '@ui-kitten/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("keyword_crawler.db");

export const Keyword = () => {
    const [listData, setListData] = useState();

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

    React.useEffect(() => {
        selectAll();
      }, []);

    const closeRow = (rowMap, rowKey) => {
        debugger;
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <Card>
            <View>
                <Text>{data.item.name}</Text>
            </View>
            </Card>
    );

    const renderHiddenItem = (data, rowMap) => (
        <Card>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => {closeRow(rowMap, data.item.id)}}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
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
        </View>
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
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
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
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
