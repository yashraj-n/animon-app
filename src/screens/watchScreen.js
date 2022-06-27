import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import Navbar from '../components/Navbar';
import {Linking, Platform} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import React, {useState, useEffect} from 'react';
import SERVER_URL from '../utils/serverURL';

export default function Watch({navigation}) {
  const [Eps, setEps] = useState([]);
  const [Data, setData] = useState({});
  const [Loading, setLoading] = useState(true);
  const [Ep, setEp] = useState(1);
  const [currentEpUrl, setCurrentEpUrl] = useState('');
  const [streamButton, setStreamButton] = useState(true);

  useEffect(() => {
    fetch(SERVER_URL + '/api/anime/data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: navigation.getParam('id'),
      }),
    })
      .then(res => res.json())
      .then(res => {
        setData(res.data);
        setEps(res.data.episodes);
        setLoading(false);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    setStreamButton(true);
    fetch(SERVER_URL + '/api/stream', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: navigation.getParam('id'),
        ep: Ep,
      }),
    })
      .then(res => res.json())
      .then(res => {
        setCurrentEpUrl(res.android);
        console.log(Ep, res);
        setStreamButton(false);
      });
  }, [Ep]);

  const changeEpisode = ep => {
    setEp(ep);
  };

  return (
    <View>
      <View>
        <Navbar navigation={navigation} />
      </View>
      {Loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text style={styles.animeName}>
            {Data.title}, Episode {Ep}
          </Text>
          <Image
            source={{
              uri: Data.image,
            }}
            style={{
              width: 170,
              height: 250,
              alignSelf: 'center',
              margin: 5,
              marginBottom: 25,
            }}
          />
          <Button
            color={'#3ad900'}
            title="Stream"
            onPress={() => {
              playVideo(currentEpUrl);
            }}
            disabled={streamButton}
          />
          <View
            style={{
              height: 250,
              width: '100%',
              alignItems: 'center',
            }}>
            <FlatList
              numColumns={5}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={Eps}
              renderItem={({item, index}) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    changeEpisode(index + 1);
                  }}>
                  <View style={styles.episode}>
                    <Text style={styles.animeBGR}>{item.name}</Text>
                    <Text style={styles.cateTxt}>{item.cate}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={item => `_` + item.name}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  animeName: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'Poppins-Black',
    color: '#00F0FF',
    marginBottom: 20,
  },
  animeBGR: {
    backgroundColor: '#303030',
    height: 60,
    width: 60,
    margin: 4,
    marginTop: 30,
    flex: 1,
    fontFamily: 'Poppins-Black',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  epText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  cateTxt: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    textAlign: 'center',
  },
});
// https://stackoverflow.com/questions/64956253/launch-url-in-default-video-player-on-android-with-react-native
function playVideo(url) {
  var fn = Platform.select({
    android() {
      SendIntentAndroid.openAppWithData(
        /* "org.videolan.vlc" */ null,
        url,
        'video/*',
      ).then(wasOpened => {});
    },
    default() {
      Linking.openURL(url).catch(err => {});
    },
  });
  fn();
}
