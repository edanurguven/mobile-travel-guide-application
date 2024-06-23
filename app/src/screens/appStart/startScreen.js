import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from '@rneui/base';

export default StartScreen = props => {
  const navigation = props.navigation;

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <View style={style.container}>
        <Image
          source={require('../../img/son.png')}
          style={style.image}
          containerStyle={style.item}
        />
        <Button
          title="Oturum Aç"
          loading={false}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={style.buttonStyle}
          titleStyle={style.titleStyle}
          containerStyle={style.containerStyle}
          onPress={() => navigation.push('SignInScreen')}
        />
        <Button
          title="Kayıt Ol"
          loading={false}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={style.buttonStyle}
          titleStyle={style.titleStyle}
          containerStyle={style.containerStyle}
          onPress={() => navigation.push('SignUpScreen')}
        />
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#3433E2', //'rgba(111, 202, 186, 1)',
    borderRadius: 5,
  },
  containerStyle: {
    marginHorizontal: 50,
    height: 50,
    width: 200,
    marginVertical: 10,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  item: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});
