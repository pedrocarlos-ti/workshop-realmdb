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

  function selectCharacter(name) {
    switch (name) {
      case 'rick':
        return {
          id: '@rick',
          name: 'Rick',
          lastName: 'Sanchez',
          nickname: '@Wubbalubbadubdub',
          photo: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        };
      case 'morty':
        return {
          id: '@morty',
          name: 'Morty',
          lastName: 'Smith',
          nickname: '@ohMan..',
          photo:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/83/83939c1eba80f6c3baf410abe85b524b6ed0598e_full.jpg',
        };
      default:
        return {};
    }
  }

  return (
    <Modal visible={isEnabled} onRequestClose={close} transparent>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Text style={styles.title}>Novo Post</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={v => setTitle(v)}
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={v => setDescription(v)}
          />

          <Picker selectedValue={person} onValueChange={v => setPerson(v)}>
            <Picker.Item label="Rick Sanchez" value="rick" />
            <Picker.Item label="Morty Smith" value="morty" />
          </Picker>

          <Button
            style={styles.button}
            title="Adicionar Post"
            onPress={() =>
              // savePost({ title, description, user: selectCharacter(person) })
              savePost({ title, description })
            }
          />
        </View>
      </View>
    </Modal>
  );
}

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
  },
  button: {
    margin: 10,
  },
});
