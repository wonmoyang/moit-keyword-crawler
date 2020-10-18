import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Button, Avatar, ListItem, Layout, Card, Text, Header, Footer, Divider } from '@ui-kitten/components';


import axios from 'axios';

import { DetailNewsList } from '../../component/DetailNewsList';
import { NewsKeyword } from '../../component/NewsKeyword';

const InstallButton = (props) => (
<Button size='tiny'>
    INSTALL
</Button>
);

export const DetailList = ({ navigation, route }) => {

    const { keyword } = route.params;
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [src, setSrc] = React.useState('');
    const [content, setContent] = React.useState('');

    const [start, setStart] = React.useState(1);
    const [results, setResults] = React.useState([]);

    const [itemToRender, setItemToRender] = React.useState(10);

    const getNews = (start) => {
        axios
        .get(`https://search.naver.com/search.naver?where=news&query=${keyword}&start=${start}`,{
            headers: {
                'User-Agent':'Mozilla/5.0' //the token is a variable which holds the token
            }
        })
        .then( res => {
            const cheerio = require('react-native-cheerio');
            const $ = cheerio.load(res.data);

            let items = [];
            let lists = $('ul.type01 > li');

            lists.map((n, articles) => {
              let result = new Map();
              var title = $(articles).find('a._sp_each_title').text();
              var author = $(articles).find("span._sp_each_source").text();
              var src = $(articles).find('div.thumb img').prop('src');
              var content = $($(articles).find('dl dd')[1]).text();
              var uri = $(articles).find('dl dt a').attr('href');

              var date = '';
              var timeArr = $(articles).find('dd.txt_inline').text().split('  ');
              if(timeArr.length > 5){
                date = $(articles).find('dd.txt_inline').text().split('  ')[2];
              }else{
                date = $(articles).find('dd.txt_inline').text().split('  ')[1];
              }


              result.set('title', title);
              result.set('author', author);
              result.set('src', src);
              result.set('content', content);
              result.set('date', date);
              result.set('uri', uri);
              items.push(result);
            })

            setResults(results.concat(items));
            setStart(start);

        })
        .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
        });
    }
    
    React.useEffect(() => {
        getNews(start);
      }, [keyword]);

      const Header = (props) => (
        <View {...props}>
          <Text category='h6'>Maldives</Text>
          <Text category='s1'>By Wikipedia</Text>
        </View>
      );
      
      const Footer = (props) => (
        <View {...props} style={[props.style, styles.footerContainer]}>
          <Button
            style={styles.footerControl}
            size='small'
            status='basic'>
            CANCEL
          </Button>
          <Button
            style={styles.footerControl}
            size='small'>
            ACCEPT
          </Button>
        </View>
      );

   return (
      <ScrollView scrollEventThrottle={1} onMomentumScrollEnd={(e) => {
          const scrollPosition = e.nativeEvent.contentOffset.y;
          const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
          const contentHeight = e.nativeEvent.contentSize.height;
          const isScrolledToButtom = scrollViewHeight + scrollPosition;

          if(isScrolledToButtom >= (contentHeight-50) && 10 <= results.length) {
            getNews(start+10);
            setItemToRender(itemToRender+10);
          } 
      }}>
      {results.map((result, index) => {
       if(index+1 <= itemToRender){
        return (<>
          <DetailNewsList navigation={navigation} keyword={result}/>
          <Divider/>
          </>)
       }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});