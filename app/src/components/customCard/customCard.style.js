import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  title: {
    color: '#9D00FF',
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
  },
  image: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 4,
    borderRadius: 10,
  },
  favorite: {
    borderRadius: 50,
    // backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
  save: {
    marginLeft: 5,
    borderRadius: 50,
    //backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center',
    marginleft: 20,
  },
});
