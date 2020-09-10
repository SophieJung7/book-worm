import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingScreen from './screens/SettingScreen';
import CustomDrawerComponent from './screens/DrawerNavigator/CustomDrawerComponent';
import BooksReadingScreen from './screens/HomeTabNavigator/BooksReadingScreen';
import BooksReadScreen from './screens/HomeTabNavigator/BooksReadScreen';
import LoadingScreen from './screens/AppSwitchNavigator/LoadingScreen';

import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/config';

import colors from './assets/colors';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import store from './redux/store';
import BooksCountContainer from './redux/containers/BooksCountContainer';

class App extends Component {
  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

// Bottom Tab
const HomeTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Total Books',
        tabBarIcon: ({ tintColor }) => {
          return <BooksCountContainer color={tintColor} type='books' />;
        },
      },
    },
    BooksReadingScreen: {
      screen: BooksReadingScreen,
      navigationOptions: {
        tabBarLabel: 'Books Reading',
        tabBarIcon: ({ tintColor }) => {
          return <BooksCountContainer color={tintColor} type='booksReading' />;
        },
      },
    },
    BooksReadScreen: {
      screen: BooksReadScreen,
      navigationOptions: {
        tabBarLabel: 'Books Read',
        tabBarIcon: ({ tintColor }) => {
          return <BooksCountContainer color={tintColor} type='booksRead' />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.bgMain,
      },
      tabStyle: {
        justifyContent: 'center',
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
    },
  }
);

HomeTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case 'HomeScreen':
      return {
        headerTitle: 'Total Books',
      };
    case 'BooksReadingScreen':
      return {
        headerTitle: 'Books Reading',
      };
    case 'BooksReadScreen':
      return {
        headerTitle: 'Books Read',
      };
    default:
      return {
        headerTitle: 'Book Worm',
      };
  }
};

// Bottom Tab Header를 똑같이 만들기 위해 StackNavigator를 사용함
const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: {
      screen: HomeTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: () => (
            <Ionicons
              name='ios-menu'
              size={30}
              color={colors.logoColor}
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
      headerTintColor: colors.txtWhite,
    },
  }
);

// LoadingScreen ==> WelcomeScreen ==> LoginScreen
const switchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginStackNavigator: createStackNavigator(
    {
      WelcomeScreen,
      LoginScreen,
    },
    {
      mode: 'modal',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: colors.bgMain,
        },
      },
    }
  ),
  DrawerNavigator: createDrawerNavigator(
    {
      // BottomTab임
      HomeStackNavigator: {
        screen: HomeStackNavigator,
        navigationOptions: {
          title: 'Home',
          drawerIcon: () => <Ionicons name='ios-home' size={24} />,
        },
      },
      SettingScreen: {
        screen: SettingScreen,
        navigationOptions: {
          title: 'Setting',
          drawerIcon: () => <Ionicons name='ios-settings' size={24} />,
        },
      },
    },
    {
      contentComponent: CustomDrawerComponent,
    }
  ),
});

const AppContainer = createAppContainer(switchNavigator);

export default App;
