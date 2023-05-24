import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
  Image,
  RefreshControl,
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
    const date = new Date(Date.now()).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });
    const newkey = newNoticeRef.key; // Add this line to get the newkey
    set(newNoticeRef, {
      content: content,
      date: date,
      title: title,
    });
    props.navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView>
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
            style={styles.content}
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
            style={styles.content}
            placeholder="내용을 입력해 주세요"
            onChangeText={(text) => setContent(text)}
            value={content}
            ref={(input) => (contentInput = input)}
            returnKeyType="done"
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
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
    height: 60,
    backgroundColor: 'powderblue',
    borderRadius: 10,
    marginLeft: 16,
    marginTop: 20,
  },
  titletext2: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  contentcontainer: {
    width: '91%',
    height: '100%',
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginLeft: 17,
    marginTop: 30,
  },
  content: {
    fontSize: 17,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
  },
});
