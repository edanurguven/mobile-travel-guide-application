import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from '@rneui/themed';
import {useState, useEffect} from 'react';
import authFuncs from '../../auth/authFuncs';
import security from '../../settings/security';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

export default SignInScreen = props => {
  const navigation = props.navigation;

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {}, [errorMessage]);

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <View style={style.body}>
        <ScrollView>
          <View>
            <View style={style.container}>
              <Input
                placeholder="Email"
                onChangeText={value => {
                  setEmail(value);
                  console.log('email :', value);
                }}
              />
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={value => setPassword(value)}
              />
            </View>
            <View style={style.buttonContainer}>
              {errorMessage !== '' && (
                <Text style={style.errorStyle}>{errorMessage}</Text>
              )}
              <Button
                title="Sign In"
                loading={false}
                loadingProps={{size: 'small', color: 'white'}}
                buttonStyle={style.buttonStyle}
                titleStyle={style.titleStyle}
                containerStyle={style.containerStyle}
                errorMessage={errorMessage}
                errorStyle={style.errorStyle}
                onPress={async () => {
                  if (!email || !password) {
                    setErrorMessage(
                      'Girdiğiniz bilgilerde hata bulunmaktadır.',
                    );
                    return;
                  }

                  try {
                    var status = await authFuncs.signInFunc(
                      security.spaceControll(email),
                      password,
                    );

                    if (!status) {
                      setErrorMessage('E-mail veya şifre yanlış.');
                      console.log('giriş yapılamadı.');
                      return;
                    }

                    console.log('Giriş yapıldı');
                    navigation.navigate('RootNavigate', {screen: 'HomePage'});
                  } catch (error) {
                    console.log('ERROR-SIGNInSCREEN : ', error);
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#686de0',
  },
  container: {
    margin: 30,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffffff',
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
    fontFamily: 'Nunito-Regular',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  errorStyle: {
    fontFamily: 'Nunito-Regular',
    color: '#192a56',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
