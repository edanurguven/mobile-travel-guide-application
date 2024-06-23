import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  title: {
    color: '#9D00FF',
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
  },
  favorite: {
    borderRadius: 50,
    //backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  header: {
    borderRadius: 20,
    height: 85,
    //backgroundColor: 'rgba(255, 255, 255, 0.6)', //'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconSuperContainer: {
    justifyContent: 'flex-end',
  },
  text: {
    color: '#4361ee',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 5,
    fontFamily: 'Nunito-Regular',
  },
  miniText: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
});
