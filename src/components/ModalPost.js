import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  Picker,
} from 'react-native';

export default function ModalPost({ isEnabled, close, savePost }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [person, setPerson] = useState('rick');

  //Select Rick or Morty
  function selectCharacter(name) {
    switch (name) {
      case 'rick':
        return {
          name: 'Rick Sanchez',
          nickname: '@Wubbalubbadubdub',
          avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        };
      case 'morty':
        return {
          name: 'Morty Smith',
          nickname: '@ohMan',
          avatar:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/83/83939c1eba80f6c3baf410abe85b524b6ed0598e_full.jpg',
        };
      default:
        return '';
    }
  }

  //Reset Form and submit Post
  function save() {
    setTitle('');
    setDescription('');
    savePost({
      title,
      description,
      person: selectCharacter(person),
    });
  }

  return (
    <Modal visible={isEnabled} onRequestClose={close} transparent>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Text style={styles.title}>NOVO POST</Text>
          <TextInput
            style={styles.input}
            placeholder="Qual o titulo do post?"
            value={title}
            onChangeText={v => setTitle(v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Qual a descrição do post?"
            value={description}
            onChangeText={v => setDescription(v)}
          />
          <Picker selectedValue={person} onValueChange={v => setPerson(v)}>
            <Picker.Item label="Rick Sanchez" value="rick" />
            <Picker.Item label="Morty Smith" value="morty" />
          </Picker>
          <Button style={styles.button} title="Adicionar Post" onPress={save} />
        </View>
      </View>
    </Modal>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: '#282A36',
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#E7E7E7',
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    margin: 10,
  },
});
