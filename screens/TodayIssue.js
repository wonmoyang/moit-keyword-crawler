import React from 'react';
import { Button, Icon, List, ListItem, Select, SelectItem, IndexPath, Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import axios from 'axios';

export const TodayIssue = () => {

  const [list, setList] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [displayValue, setDisplayValue] = React.useState('전체');

  const data = [
    '2020-10-16|d'
  ];

  const onSelect = (index) => {
    setDisplayValue(data[index.row].split('|')[0]);
    setSelectedIndex(index);
  }

  const getTodayIssueList = () => {
    axios
    .get(`https://www.bigkinds.or.kr/search/trendReportData.do?SEARCH_DATE=2020-10-16`,{
        headers: {
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36' //the token is a variable which holds the token
        }
    })
    .then( res => {
        let items = res.data.trendList[0].topic_list;
        setList(items);
    })
    .catch(e => {  // API 호출이 실패한 경우
      console.error(e);  // 에러표시
    });

  }

  React.useEffect(() => {
    getTodayIssueList();
  }, [list]);

  const renderItemIcon = (props) => (
    <Icon {...props} fill='#FF5D00' name='hash'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.topic_text}`}
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