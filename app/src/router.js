import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {View, Text, StatusBar, PermissionsAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Icon} from '@rneui/base';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';

import authFuncs from './auth/authFuncs';

import Account from './screens/account/account';
import StartScreen from './screens/appStart/startScreen';
import SignInScreen from './screens/appStart/signInScreen';
import SignUpScreen from './screens/appStart/signUpScreen';
import PlaceOffers from './screens/maps/placesOffers';
import PlaceOfferDetails from './screens/maps/placeOfferDetails';
import MeGeolocation from './screens/maps/meGeolocation';
import SettingScreen from './screens/maps/settingScreen';
import FavoritesScreen from './screens/maps/favourites';
import HomePage from './screens/home/homepage';
import FirstScreen from './screens/firstScreen';
import Example from './screens/example';
import SavedScreen from './screens/maps/saved';
import Loading from './components/loading';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

/* Add Drawer.Navigation to a function.*/
function Root() {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <>
          <StatusBar
            translucent
            backgroundColor="rgba(255, 255, 255, 0.2)"
            barStyle="dark-content"
          />
          <View style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50,
              }}>
              {authFuncs.checkOutFunc() ? (
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {authFuncs.checkOutFunc().email}
                </Text>
              ) : null}
            </View>
            <DrawerItemList {...props} />
          </View>
        </>
      )}>
      <Drawer.Screen
        options={{headerTitle: 'Ana sayfa', title: 'Ana Sayfa'}}
        name="HomePage"
        component={HomePage}
      />
      <Drawer.Screen
        options={{headerShown: false, title: 'Konumum'}}
        name="FirstScreen"
        component={FirstScreen}
      />
      <Drawer.Screen
        options={{headerTitle: 'Yer Araması', title: 'Yer Araması'}}
        name="SettingScreen"
        component={SettingScreen}
      />
      <Drawer.Screen
        options={{headerTitle: 'Kaydedilenler', title: 'Kaydedilenler'}}
        name="SavedScreen"
        component={SavedScreen}
      />
      <Drawer.Screen
        options={{headerTitle: 'Favorilerim', title: 'Favorilerim'}}
        name="FavoritesScreen"
        component={FavoritesScreen}
      />
      <Drawer.Screen
        options={{headerTitle: 'Hesabım', title: 'Hesabım'}}
        name="Account"
        component={Account}
      />
    </Drawer.Navigator>
  );
}
//<Drawer.Screen name="App" component={App} />
//options içine  => headerRight: () => <MeGeolocation />

export default Router = () => {
  // const authControl = await authFuncs.checkOutFunc();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const checkAuthentication = async () => {
    try {
      const user = auth().currentUser;
      console.log('USER HAS BEEN ? :', user);
      if (user) {
        console.log('ROUTER USER EMAİL : ', user.email);
        setIsAuthenticated(true);
        dispatch({type: 'add_email', payload: {email: user.email}});
        setLoading(false);
      }

      //
      else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
    getLocation();
  }, []);

  const getLocation = async () => {
    const hasLocationPermission = await requestLocationPermission();

    if (!hasLocationPermission) return;
    Geolocation.getCurrentPosition(
      async position => {
        try {
          console.log(position);
          dispatch({
            type: 'update_lat',
            payload: {lat: position.coords.latitude},
          });
          dispatch({
            type: 'update_lon',
            payload: {lon: position.coords.longitude},
          });
        } catch (error) {
          console.error('Veri alınamadı:', error);
        }
      },
      error => {
        console.error('Konum alınamadı:', error);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="Root"
            component={Root}
          />
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="StartScreen"
            component={StartScreen}
          />
        )}
        <Stack.Screen
          options={{headerTitle: 'Oturum Açma'}}
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{headerTitle: 'Kayıt Olma'}}
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Account"
          component={Account}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen
          options={({navigation}) => ({
            title: 'Sonuçlar',
            headerLeft: () => (
              <Icon
                name="chevron-circle-left"
                type="font-awesome"
                color="black"
                size={30}
                iconStyle={{marginLeft: 10}}
                onPress={() => {
                  navigation.navigate('Root', {screen: 'SettingScreen'});
                }}
              />
            ),
          })}
          name="PlaceOffers"
          component={PlaceOffers}
        />
        <Stack.Screen
          options={{headerTitle: 'Önerilen Yer Detayları'}}
          name="PlaceOfferDetails"
          component={PlaceOfferDetails}
        />
        <Stack.Screen
          options={{headerTitle: 'Konumum'}}
          name="MeGeolocation"
          component={MeGeolocation}
        />
        <Stack.Screen
          options={{headerTitle: 'Yer Arama Ayarları'}}
          name="SettingScreen"
          component={SettingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RootNavigate"
          component={Root}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="StartScreenNavigate"
          component={StartScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="FirstScreen"
          component={FirstScreen}
        />
        <Stack.Screen
          options={{headerTitle: 'Favoriler'}}
          name="FavoritesScreen"
          component={FavoritesScreen}
        />
        <Stack.Screen
          options={{headerTitle: 'Kaydedilenler'}}
          name="SavedScreen"
          component={SavedScreen}
        />
        <Stack.Screen
          options={{headerTitle: 'Example'}}
          name="Example"
          component={Example}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
