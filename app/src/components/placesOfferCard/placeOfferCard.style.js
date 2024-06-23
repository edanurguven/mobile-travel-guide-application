import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  title: {
    color: '#9D00FF',
    fontSize: 18,
  },
  image: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 4,
    borderRadius: 10,
  },
  favorite: {
    borderRadius: 50,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});
