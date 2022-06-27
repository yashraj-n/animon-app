import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import AnimeCard from '../components/Card';
import Navbar from '../components/Navbar';
import SERVER_URL from '../utils/serverURL';

export default function HomeScreen({navigation}) {
  const [PopularAnime, setPopularAnime] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SERVER_URL + '/api/popular')
      .then(res => res.json())
      .then(res => {
        setPopularAnime(res.data);
        setLoading(false);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Navbar navigation={navigation} />
        {Loading ? (
          <View style={styles.loading}>
            <ActivityIndicator
              size={'large'}
              style={{
                alignSelf: 'center',
                marginTop: '50%',
              }}
            />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.content}>
              <Text style={styles.popular_text}>Popular</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {PopularAnime.map((item, index) => {
                  return (
                    <AnimeCard
                      key={index}
                      img={item.image}
                      id={item.id}
                      title={item.title}
                      navigation={navigation}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    height: '100%',
  },
  popular_text: {
    fontFamily: 'Poppins-ExtraBold',
    color: '#FFA800',
    fontSize: 25,
    marginBottom: 20,
  },
  content_grid: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
