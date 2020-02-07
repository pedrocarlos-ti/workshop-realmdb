import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const IMAGE_URL = 'https://images.emojiterra.com/twitter/v12/512px/2764.png';
const AVATAR_URL =
  'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/83/83939c1eba80f6c3baf410abe85b524b6ed0598e_full.jpg';

export default function App({ props, like }) {
  return (
    <View style={styles.containert}>
      <View style={styles.group}>
        <Image
          style={styles.avatar}
          source={{
            uri: props.avatar,
          }}
        />
        <View style={styles.profile}>
          <View style={styles.group}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.nickname}>{props.nickname}</Text>
          </View>

          <Text>{props.title}</Text>
          <Text>{props.description}</Text>

          <TouchableOpacity
            style={styles.social}
            activeOpacity={0.5}
            onPress={() => like(props.id)}>
            <Image
              style={styles.heart}
              source={{
                uri: IMAGE_URL,
              }}
            />
            <Text style={styles.likes}>{props.likes} curtidas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: '#00AEF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  containert: {
    backgroundColor: '#fff',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 0.75,
    padding: 20,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 35,
  },
  profile: {},
  name: {
    color: '#3B4044',
    fontSize: 16,
  },
  nickname: {
    color: '#90A0AC',
    fontSize: 12,
    marginLeft: 5,
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
  likes: {
    marginLeft: 5,
    fontSize: 12,
    color: '#90A0AC',
  },
});
