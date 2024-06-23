import {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import style from './account.style';
import {Icon, Button, Overlay} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import authFuncs from '../../auth/authFuncs';
import controlDb from '../../auth/controlDb';
import Loading from '../../components/loading';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {Screen} from 'react-native-screens';

export default Account = props => {
  const navigation = props.navigation;
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const email = useSelector(state => state.email);
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await controlDb.getUserName(email);
        dispatch({type: 'add_username', payload: {userName: data}});
        setUserName(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorViewer />;
  }

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <View style={style.container}>
        <Text style={style.title}>{userName}</Text>
        <View style={style.footer}>
          <Button
            buttonStyle={style.buttonStyleFavori}
            radius={'sm'}
            onPress={() => {
              navigation.navigate('FavoritesScreen');
            }}
            disabledTitleStyle={{color: '#00F'}}
            containerStyle={style.containerStyle}
            type="solid">
            Beğenilenler
          </Button>
          <Button
            buttonStyle={style.buttonStyleSaved}
            radius={'sm'}
            onPress={() => {
              navigation.navigate('SavedScreen');
            }}
            disabledTitleStyle={{color: '#00F'}}
            containerStyle={style.containerStyle}
            type="solid">
            Kaydedilenler
          </Button>
          <Button
            buttonStyle={style.buttonStyle}
            radius={'sm'}
            onPress={() => {
              authFuncs.signOutFunc();
              navigation.reset({
                index: 0,
                routes: [{name: 'StartScreenNavigate'}],
              });
            }}
            disabledTitleStyle={{color: '#00F'}}
            containerStyle={style.containerStyle}
            type="solid">
            Oturumu Sonlandır
            <Icon name="logout" color="white" />
          </Button>

          <Button
            buttonStyle={style.buttonStyleOut}
            radius={'sm'}
            onPress={async () => {
              await authFuncs.deleteUser();
              navigation.reset({
                index: 0,
                routes: [{name: 'StartScreenNavigate'}],
              });
            }}
            disabledTitleStyle={{color: '#00F'}}
            containerStyle={style.containerStyle}
            type="solid">
            Hesabı Kapat
            <Icon name="exit-to-app" color="white" />
          </Button>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text style={style.textPrimary}>Hello!</Text>
            <Text style={style.textSecondary}>
              Welcome to React Native Elements
            </Text>
            <Button
              icon={
                <Icon
                  name="wrench"
                  type="font-awesome"
                  color="white"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              title="Start Building"
              onPress={toggleOverlay}
            />
          </Overlay>
        </View>
      </View>
    </LinearGradient>
  );
};
