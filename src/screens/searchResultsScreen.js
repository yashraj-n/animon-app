import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AnimeCard from '../components/Card';
import Navbar from '../components/Navbar';
import SERVER_URL from '../utils/serverURL';

export default function SearchedResults({navigation}) {
  let query = navigation.getParam('query');

  const [SearchData, setSearchData] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(SERVER_URL + '/api/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: `{"search":"${query}"}`,
    })
      .then(res => res.json())
      .then(res => {
        setSearchData(res.data);
        setLoading(false);
      })
      .catch(err => {
        alert(err);
      });
  }, [navigation]);

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
              <Text style={styles.searchParam}>
                Search Results for "{query}"
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {SearchData.map((item, index) => {
                  return (
                    <AnimeCard
                      key={index}
                      id={item.id}
                      img={item.image}
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
    height: '100%',
    marginLeft: 15,
  },
  searchParam: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: 'white',
  },
});
