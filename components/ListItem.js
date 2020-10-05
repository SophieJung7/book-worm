import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NetworkImage from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import { Surface, Shape } from '@react-native-community/art';
import colors from '../assets/colors';

const ListItem = ({ item, children, marginVertical, editable, onPress }) => {
  return (
    <View style={[styles.listItemContainer, { marginVertical }]}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          disabled={!editable}
          style={{ flex: 1 }}
          onPress={() => onPress(item)}
        >
          {item.image ? (
            <NetworkImage
              source={{ uri: item.image }}
              style={styles.image}
              indicator={ProgressPie}
              indicatorProps={{
                size: 40,
                borderWidth: 0,
                color: colors.logoColor,
                unfilledColor: 'rgba(200,200,200,0.2)',
              }}
              imageStyle={{ borderRadius: 35 }}
            />
          ) : (
            <Image
              source={require('../assets/icon.png')}
              style={styles.image}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.listItemTitleContainer}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
      </View>
      {children}
    </View>
  );
};

ListItem.defaultProps = {
  marginVertical: 5,
  editable: false,
};

const styles = StyleSheet.create({
  listItemContainer: {
    minHeight: 100,
    flexDirection: 'row',
    backgroundColor: colors.listItemBg,
    alignItems: 'center',
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35,
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  listItemTitle: {
    fontWeight: '100',
    fontSize: 22,
    color: colors.txtWhite,
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: 'center',
  },
  listEmptyComponentText: {
    fontWeight: 'bold',
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: colors.bgSuccess,
  },
  markAsReadButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25,
  },
  addNewBookButtonText: {
    color: 'white',
    fontSize: 30,
  },
  footer: {
    height: 70,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
  },
});

export default ListItem;
