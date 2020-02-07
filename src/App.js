import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity as Button,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Realm from 'realm';

//Schemas
import User from './realm/User';
import Post from './realm/Post';

//Components
import Header from './components/Header';
import Posts from './components/Post';
import ModalPost from './components/ModalPost';

//Trick
console.disableYellowBox = true;

const SERVER_URL = 'https://reactrecife.us1a.cloud.realm.io/';
const SERVER_URL_SYNC = 'realms://reactrecife.us1a.cloud.realm.io/workshop';

export default class App extends Component {
  state = {
    realm: null,
    posts: [],
    isModalEnable: false,
  };

  //Disconnect Realm
  onLogout = () => {
    if (Realm.Sync.User.current) {
      Realm.Sync.User.current.logout();
    }
  };

  //Save post in Realm
  savePost = post => {
    if (Realm.Sync.User.current) {
      this.state.realm.write(() => {
        this.state.realm.create('Post', {
          id: String(+new Date()),
          title: post.title,
          description: post.description,
          avatar: post.person.avatar,
          name: post.person.name,
          nickname: post.person.nickname,
        });
      });

      this.setState({
        posts: this.state.realm.objects('Post'),
        isModalEnable: false,
      });
    }
  };

  //Like post in Realm
  likePost = id => {
    if (Realm.Sync.User.current) {
      this.state.realm.write(() => {
        const post = this.state.realm
          .objects('Post')
          .filtered(` id = '${id}' `)[0];

        post.likes++;
      });
    }
  };

  async componentDidMount() {
    try {
      // await Realm.Sync.Credentials.usernamePassword('admin', 'admin');
      await Realm.Sync.User.login(SERVER_URL, 'admin', 'admin'); //Expira em 01/03/20 dias.
      Realm.open({
        path: 'workshop.realm',
        sync: {
          url: SERVER_URL_SYNC,
          user: Realm.Sync.User.current,
          error: (session, err) => alert(JSON.stringify(err)),
          validate_ssl: false,
          fullSynchronisation: false,
          partial: true,
        },
        schema: [User, Post],
      })
        .then(realm => {
          const results = realm.objects('Post');
          results.subscribe();

          results.addListener(posts => {
            this.setState({ posts });
          });
          this.setState({ posts: results, realm });
        })
        .catch(e => alert(e.toString()));
    } catch (_) {
      const realm = new Realm({
        path: 'workshop.realm',
        sync: {
          url: SERVER_URL_SYNC,
          user: Realm.Sync.User.current,
          error: (session, err) => alert(JSON.stringify(err)),
          validate_ssl: false,
          fullSynchronisation: false,
          partial: true,
        },
        schema: [User, Post],
      });

      const results = realm.objects('User');

      this.setState({ posts: results, realm });
    }
  }

  render() {
    const length = this.state.posts.length;

    return (
      <View style={styles.containert}>
        <Header />

        {!length ? (
          <Loading />
        ) : (
          <ListPosts data={this.state.posts} like={this.likePost} />
        )}

        <Button
          style={styles.button}
          onPress={() => this.setState({ isModalEnable: true })}>
          <Text style={styles.add}>+</Text>
        </Button>

        <ModalPost
          isEnabled={this.state.isModalEnable}
          close={() => this.setState({ isModalEnable: false })}
          savePost={this.savePost}
        />
      </View>
    );
  }
}

// ActivityIndicator enquanto carrega os posts
const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="small" color="#00AEF0" />
    </View>
  );
};

//FlatList para renderizar os posts
const ListPosts = ({ data, like }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Posts props={item} like={like} />}
      keyExtractor={item => item.id}
    />
  );
};

//Styles
const styles = StyleSheet.create({
  containert: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00AEF0',
    bottom: 40,
    right: 15,
  },
  add: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
});
