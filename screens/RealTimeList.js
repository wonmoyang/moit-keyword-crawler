import React from 'react';
import { Button, Icon, List, ListItem, Select, SelectItem, IndexPath, Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import axios from 'axios';

export const RealTimeList = () => {

  const [list, setList] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [displayValue, setDisplayValue] = React.useState('전체');

  const data = [
    '전체|all',
    '20대|20s',
    '30대|30s',
    '40대|40s',
    '50대~|50s',
  ];

  const onSelect = (index) => {
    setDisplayValue(data[index.row].split('|')[0]);
    setSelectedIndex(index);
  }

  const getRealTimeList = () => {
    
    axios
    .get(`https://datalab.naver.com/keyword/realtimeList.naver?age=${data[selectedIndex.row].split('|')[1]}&entertainment=0&groupingLevel=1&marketing=-2&news=0&sports=0`,{
        headers: {
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36' //the token is a variable which holds the token
        }
    })
    .then( res => {
        const cheerio = require('react-native-cheerio');
        const $ = cheerio.load(res.data);
        let items = [];
        var articles = $('div.list_group .item_title');
        
        articles.map((n, b) => {
           items.push(b.children[0].data)
        });

        setList(items);

    })
    .catch(e => {  // API 호출이 실패한 경우
      console.error(e);  // 에러표시
    });

  }

  React.useEffect(() => {
    getRealTimeList();
  }, [list, selectedIndex]);

  const renderItemIcon = (props) => (
    <Icon {...props} fill='#FF5D00' name='hash'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item}`}
      accessoryLeft={renderItemIcon}
    />
  );

  const renderOption = (title) => (
    <SelectItem title={title.split('|')[0]}/>
  );

  return (
    <>
      <Layout size='small' level='1'>
        <Select
          selectedIndex={selectedIndex}
          value={displayValue}
          onSelect={index => onSelect(index)}>
          {data.map(renderOption)}
        </Select>
      </Layout>
      <List
        data={list}
        renderItem={renderItem}
      />
    </>
  );
};