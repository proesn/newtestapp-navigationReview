import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { database } from './../../firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ref, push, set, getDatabase, child } from 'firebase/database';

const dbRef = ref(database);
const noticesRef = child(dbRef, 'notices');

export const Writenoti = (props) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const Post = async () => {
    const newNoticeRef = push(noticesRef);

    const date1 = new Date(Date.now()); //시간이 들어가야하는 경우에는 이 3줄 넣어서 date 업로드 해주기 
    const date = date1.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' ' + 
                  date1.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' }); 
    //const newkey = newNoticeRef.key;
    set(newNoticeRef, {
      content: content,
      date: date,
      title: title,
      uid: newNoticeRef.key
    });
    props.navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container2}>
        <View style={styles.title}>
          <Text style={styles.titletext}>공지사항 작성</Text>
          <TouchableOpacity style={styles.button} onPress={Post}>
            <View style={styles.send}>
              <Icon name="done" size={50} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.title2}>
          <TextInput
            style={styles.content1}
            placeholder="제목을 입력 주세요"
            onChangeText={(text) => setTitle(text)}
            value={title}
            ref={(input) => (titleInput = input)}
            returnKeyType="done"
            multiline={true}
            numberOfLines={1}
          />
          <View style={styles.imagecontainer}></View>
        </View>
        <View style={styles.contentcontainer}>
          <TextInput
            style={styles.content2}
            placeholder="내용을 입력해 주세요"
            onChangeText={(text) => setContent(text)}
            value={content}
            ref={(input) => (contentInput = input)}
            returnKeyType="done"
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  container2:{
    marginTop:50,
  },

  send: {
    marginLeft: 110,
  },
  title: {
    width: '100%',
    height: 60,
    margin: 13,
    flexDirection: 'row',
  },
  titletext: {
    fontSize: 27,
    fontWeight: 'bold',
    margin: 10,
  },
  imagecontainer: {},

  inputContainer: {
    width: '90%',
    padding: 10,
    height: 60,
    backgroundColor: 'powderblue',
    borderRadius: 10,
    marginLeft: 16,
    marginTop: 20,
  },
  input: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  title2: {
    width: '91%',
    padding: 10,
    height: "100%",
    flex:1,
    backgroundColor: 'powderblue',
    borderRadius: 10,
    marginLeft: 16,
    marginTop: 10,
    justifyContent:"center",
  },
  titletext2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentcontainer: {
    width: '91%',
    height: '100%',
    flex: 1,
    backgroundColor: '#E9E4E4',
    borderRadius: 10,
    marginLeft: 17,
    marginTop: 20,
  },
  content1: {
    fontSize: 20,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
    fontWeight:"bold",
  },
  content2: {
    fontSize: 17,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
    //fontWeight:"bold",
  },
});
