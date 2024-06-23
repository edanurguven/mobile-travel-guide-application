import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 25,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Nunito-Regular',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    borderRadius: 5,
  },
  buttonStyleOut: {
    backgroundColor: '#C40C0C',
    borderRadius: 5,
  },
  containerStyle: {
    marginHorizontal: 50,
    height: 50,
    width: 200,
    marginVertical: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Nunito-Regular',
  },
  buttonStyleFavori: {
    backgroundColor: '#3433E2',
    borderRadius: 5,
  },
  buttonStyleSaved: {
    backgroundColor: '#3433E2',
    borderRadius: 5,
  },
});
