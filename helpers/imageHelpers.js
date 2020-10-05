import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const openImageLibrary = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('Sorry, we need Image Library Access to select an image.');
    return false;
  } else {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    return !result.cancelled ? result : false;
  }
};

export const openCamera = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  );

  if (status !== 'granted') {
    alert('Sorry, we need Camera Access to take a photo.');
    return false;
  } else {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      base64: true,
      //   allowsEditing doesn't work well with iOS
      allowsEditing: Platform.OS == 'ios' ? false : true,
      aspect: [4, 3],
    });

    return !result.cancelled ? result : false;
  }
};

// Change URL TO BLOB
export const prepareBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);

    xhr.send(null);
  });
};
