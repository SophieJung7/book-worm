import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import colors from '../assets/colors';
import CustomActionButton from '../components/CustomActionButton';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  onSignIn = () => {};

  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
      } catch (err) {
        if (error.code === 'auth/email-already-in-use') {
          alert('User already exists. Try Log in.');
        } else {
          console.log(err);
        }
      }
    } else {
      alert('Please enter email and password');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            style={styles.textInput}
            placeholder='abc@example.com'
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType='email-address'
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder='Enter Password'
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
          />
          <View style={{ alignItems: 'center' }}>
            <CustomActionButton
              onPress={this.onSignIn}
              style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}
            >
              <Text style={{ color: 'white', fontWeight: '100' }}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              onPress={this.onSignUp}
              style={[styles.loginButtons, { borderColor: colors.bgError }]}
            >
              <Text style={{ color: 'white', fontWeight: '100' }}>Sign Up</Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10,
  },
  loginButtons: {
    borderWidth: 0.5,
    backgroundColor: 'transparent',
    marginTop: 10,
    width: 200,
  },
});
