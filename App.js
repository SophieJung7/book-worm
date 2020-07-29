import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/config';

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingScreen from './screens/SettingScreen';
import CustomDrawerComponent from './screens/DrawerNavigator/CustomDrawerComponent';
import colors from './assets/colors';

class App extends Component {
  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };

  render() {
    return <AppContainer />;
  }
}

const switchNavigator = createSwitchNavigator({
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
      HomeScreen: {
        screen: HomeScreen,
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
