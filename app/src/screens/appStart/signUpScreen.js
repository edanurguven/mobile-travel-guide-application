import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import authFuncs from '../../auth/authFuncs';
import dbFunctions from '../../auth/controlDb';
import LinearGradient from 'react-native-linear-gradient';
import security from '../../settings/security';
import {ScrollView} from 'react-native-gesture-handler';

export default SignUpScreen = props => {
  const navigation = props.navigation;

  let [userName, setUserName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [passwordAgain, setPasswordAgain] = useState('');
  let [errorMessage, setErrorMessage] = useState('');
  let favorites = '';
  let saved = [];

  useEffect(() => {}, [errorMessage]);

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <View style={style.body}>
        <ScrollView>
          <View>
            <View style={style.container}>
              <Input
                placeholder="User Name"
                onChangeText={value => {
                  value = security.spaceControll(value);
                  setUserName(value);
                  console.log('username:', value);
                }}
              />
              <Input
                placeholder="Email"
                onChangeText={value => {
                  value = security.spaceControll(value);
                  setEmail(value);
                  console.log('email :', value);
                }}
              />
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={value => setPassword(value)}
              />
              <Input
                placeholder="Password Again"
                secureTextEntry={true}
                onChangeText={value => setPasswordAgain(value)}
              />
            </View>

            <View style={style.buttonContainer}>
              {errorMessage !== '' && (
                <Text style={style.errorStyle}>{errorMessage}</Text>
              )}
              <Button
                title="Sign Up"
                loading={false}
                loadingProps={{size: 'small', color: 'white'}}
                buttonStyle={style.buttonStyle}
                titleStyle={style.titleStyle}
                containerStyle={style.containerStyle}
                errorMessage={errorMessage}
                errorStyle={style.errorStyle}
                onPress={async () => {
                  if (
                    security.nullable(userName) &&
                    security.nullable(email) &&
                    password == passwordAgain &&
                    security.nullable(password)
                  ) {
                    try {
                      if (
                        (await authFuncs.signUpFunc(email, password)) &&
                        (await dbFunctions.addUserDbPlace(
                          userName,
                          email,
                          favorites,
                          saved,
                        ))
                      ) {
                        console.log('Giriş yapıldı');
                        navigation.navigate('RootNavigate', {
                          screen: 'Account',
                        });
                      } else {
                        setErrorMessage('Hatalı işlem.');
                        console.log('giriş yapılamadı.');
                      }
                    } catch (error) {
                      console.log('ERROR-SIGNUPSCREEN : ', error);
                    }
                  } else {
                    setErrorMessage(
                      'Girdiğiniz bilgilerde hata bulunmaktadır.',
                    );
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
    color: '#192a56',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito-Regular',
  },
});
