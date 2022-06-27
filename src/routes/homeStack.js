import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Home from '../screens/homeScreen';
import Search from '../screens/searchResultsScreen';
import Watch from '../screens/watchScreen';

const screens = {
  Home: {
    screen: Home,

  },
  Search: {
    screen: Search,
  },
  WatchScreen:{
    screen: Watch,
  }
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
    cardStyle:{
      backgroundColor:'#1C1C1C',
    }
  },
});

export default createAppContainer(HomeStack);
