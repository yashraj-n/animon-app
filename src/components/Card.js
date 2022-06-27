import React from 'react';
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native';

export default function AnimeCard({img, title, id, navigation}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('WatchScreen', {id, ep: 1});
      }}>
      <View>
        <Image
          source={{
            uri: img,
            height: 150,
            width: 100,
          }}
          style={{
            margin: 8,
          }}
        />
        <Text
          style={{
            color: 'white',
            marginBottom: 50,
            fontFamily: 'Poppins-Black',
            width: 100,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
