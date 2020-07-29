import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import colors from '../../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import { DrawerItems } from 'react-navigation-drawer';

class CustomDrawerComponent extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
        <View
          style={{
            height: 150,
            backgroundColor: colors.bgMain,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: Platform.OS === 'android' ? 40 : 0,
          }}
        >
          <Ionicons name='ios-bookmarks' size={100} color={colors.logoColor} />
          <Text style={{ fontSize: 24, color: 'white', fontWeight: '100' }}>
            Book Worm
          </Text>
        </View>
        <DrawerItems {...this.props} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomDrawerComponent;
