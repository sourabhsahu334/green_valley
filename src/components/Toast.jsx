import { Platform, ToastAndroid, Alert } from 'react-native';

export const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else if (Platform.OS === 'ios') {
    Alert.alert('Alert', message, [{ text: 'OK' }]);
  }
};
