import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default function Navbar({navigation}) {
  return (
    <View style={styles.navbar}>
      <Text style={styles.header_text}>Animon</Text>
      <TextInput
        placeholder="Search..."
        placeholderTextColor={'#CECECE'}
        style={styles.search_input}
        textAlignVertical="center"
        onSubmitEditing={e => {
          navigation.navigate('Search', {query: e.nativeEvent.text});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flex: 0,
    flexDirection: 'row',
    padding: 20,
  },
  header_text: {
    fontFamily: 'Poppins-Black',
    color: '#FFA800',
    fontSize: 25,
  },
  search_input: {
    backgroundColor: 'rgba(100, 100, 100, 0.36);',
    height: 32,
    margin: 0,
    padding: 0,
    paddingLeft: 10,
    width: 150,
    borderRadius: 10,
    margin: '1%',
    marginLeft: '25%',
    fontFamily: 'Poppins-ExtraBold',
    color: 'white',
  },
});
