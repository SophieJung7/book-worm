import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import colors from '../../assets/colors';

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkIfLoggedIn = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Navigate to the home screen
        this.props.navigation.navigate('HomeScreen', { user });
      } else {
        // Navigate to the Login screen
        this.props.navigation.navigate('LoginStackNavigator');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.logoColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgMain,
  },
});

export default LoadingScreen;
