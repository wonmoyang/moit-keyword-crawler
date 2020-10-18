import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Avatar, ListItem } from '@ui-kitten/components';

import axios from 'axios';

const InstallButton = (props) => (
<Button size='tiny'>
    INSTALL
</Button>
);
export const NewsList = ({ navigation }) => {


    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [src, setSrc] = React.useState('');
    const [content, setContent] = React.useState('');

  
    const ItemImage = (props) => {
        return (
            <Avatar
            
            style={[props.style, { tintColor: null, width:50, height:50 }]}
            source={{
                uri: src,
              }}
        />);
    };
    

    const getNews = () => {
        axios
        .get("https://search.naver.com/search.naver?where=news&query=비트코인",{
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

            
            setTitle(title);
            setAuthor(author);
            setSrc(src);
            setContent(content);

        })
        .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
        });
    }
    
    React.useEffect(() => {
        getNews();
      }, [title, src]);

  return (
    <SafeAreaView>
      <ListItem style={{height:50}}
      title={title}
      description={`[${author}] - ${content}`}
      accessoryLeft={ItemImage}
      //accessoryRight={InstallButton}
    />
    </SafeAreaView>
  );
};