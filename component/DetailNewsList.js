import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Icon, Layout, Card, Text, Header, Footer, Avatar } from '@ui-kitten/components';

export const DetailNewsList = ({ navigation, route, keyword }) => {

  const HashIcon = (props) => (
    <Icon style={styles.icon} fill='#FF5D00' name='hash'/>
  )

  const Header = (props) => (
    
    <View {...props}>
      <View style={{flex:1, flexDirection:'row'}}>
        <HashIcon/>
        <Text category='h6'>{keyword.get('title')}</Text>
      </View>
      <Text category='p2'></Text>
      <Text category='p2' stlye={{bottom:50}}>{`${keyword.get('author')} | ${keyword.get('date')}`}</Text>
    </View>
  );
      
  const Footer = (props) => ( 
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'>
        스크랩
      </Button>
    </View>
  );


  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: "목록",
        headerTitleAlign:"center"
    });
    }, []);

  return (
    <Layout style={styles.topContainer} level='1'>
    <Card style={styles.card} header={Header} footer={Footer} onPress={() => {navigation.navigate('Detail', {uri: keyword.get('uri')})}}>
      <Layout style={{flex:1, flexDirection:'row'}} level='1'>
      <Avatar style={[{ tintColor: null, width:50, height:50, marginRight:20 }]}
        source={{
            uri: keyword.get('src'),
          }}></Avatar>
         <Text style={{flex:1}}>{keyword.get('content')}</Text>
      </Layout>
    </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
  icon: {
    width: 20,
    height: 20,
  },
});