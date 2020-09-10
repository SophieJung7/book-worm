import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import colors from '../assets/colors';
import CustomActionButton from '../components/CustomActionButton';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  onSignIn = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (response) {
          this.setState({ isLoading: false });
          //   Navigate the user to homepage
          this.props.navigation.navigate('LoadingScreen');
        }
      } catch (err) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case 'auth/user-not-found':
            alert('A user with that email does not exist. Try signing up.');
            break;
          case 'auth/invalid-email':
            alert('Please enter an email address.');
        }
      }
    } else {
      alert('Please enter email and password.');
    }
  };

  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        if (response) {
          this.setState({ isLoading: false });
          //   Sign In User (Below code is for saving user without Cloud Function)
          //   const user = await firebase
          //     .database()
          //     .ref('/users')
          //     .child(response.user.uid)
          //     .set({ email: response.user.email, uid: response.user.uid });

          this.onSignIn(this.state.email, this.state.password);
        }
      } catch (err) {
        console.log(err);
        this.setState({ isLoading: false });
        if (err.code === 'auth/email-already-in-use') {
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
        {this.state.isLoading ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                elevation: 1000,
              },
            ]}
          >
            <ActivityIndicator size='large' color={colors.logoColor} />
          </View>
        ) : null}
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
