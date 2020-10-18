import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Button, Text, Layout } from '@ui-kitten/components';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';

export const NewsKeyword = ({ navigation, keyword }) => {

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [src, setSrc] = React.useState('');
    const [content, setContent] = React.useState('');
    const [time, setTime] = React.useState('');

    const goDetailList = (props) => {
      return navigation.navigate('DetailList', {
        keyword: keyword.name
      });
    }

  
    const ItemImage = (props) => {
        return (
            <Avatar
            
            style={[props.style, { tintColor: null, width:50, height:40 }]}
            source={{
                uri: src,
              }}
        />);
    };

    const Date = (props) => (
        <TouchableOpacity>
          <Text dangerous  appearance='hint' category='c2' style={{bottom:25}}>{time}</Text>
        </TouchableOpacity>
    );
    

    const getNews = () => {
        axios
        .get(`https://search.naver.com/search.naver?where=news&query=${keyword.name}`,{
            headers: {
                'User-Agent':'Mozilla/5.0' //the token is a variable which holds the token
            }
        })
        .then( res => {
            const cheerio = require('react-native-cheerio')
            const $ = cheerio.load(res.data)
            let articles = $('ul.type01 > li')[0];
            let title = $(articles).find('a._sp_each_title').text();
            let author = $(articles).find("span._sp_each_source").text();
            let src = $(articles).find('div.thumb img').prop('src');
            let content = $($(articles).find('dl dd')[1]).text();
            //let time = $($($(articles).find('dd.txt_inline').children()[1])[0]).next.data;
            let timeArr = $(articles).find('dd.txt_inline').text().split('  ');
            let date = '';
            if(timeArr.length > 5){
              date = $(articles).find('dd.txt_inline').text().split('  ')[2];
            }else{
              date = $(articles).find('dd.txt_inline').text().split('  ')[1];
            }
            
            setTitle(title);
            setAuthor(author);
            setSrc(src);
            setContent(content);
            setTime(date);

        })
        .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
        });
    }
    
    React.useEffect(() => {
        getNews();
      }, []);

  return (
    <ListItem 
      onPress={(e) => {goDetailList(e)}}
      style={{height:100}}
      title={`#${keyword.name}`}
      description={`${content}`}
      accessoryLeft={ItemImage}
      accessoryRight={Date}
    />
  );
};