import {
  Text,
  View,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import NextFindPlaceCard from '../../components/nextFindPlaceCard/nextFindPlaceCard';
import CustomCard from '../../components/customCard/customCard';
import exampleData from './exampleData';
import Loading from '../../components/loading';
import ErrorViewer from '../../components/error';
import useFetch from '../../hooks/useFetch';

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

const MeGeolocation = props => {
  const navigation = props.navigation;
  const drawer = useNavigation();
  const dispatch = useDispatch();
  // const {distance, selectedItems} = props.route.params;
  const distance = useSelector(selector => selector.distance);
  const selectedItems = useSelector(selector => selector.placeTypes);
  const [data, setData] = useState();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {data: getData} = useFetch('/list');
  console.log('normal data ==> ', getData.data);

  const savedDatas = async () => {};

  const getLocation = async () => {
    const hasLocationPermission = await requestLocationPermission();

    if (!hasLocationPermission) return;

    Geolocation.getCurrentPosition(
      async position => {
        try {
          console.log(position);
          setLocation(position);
          dispatch({
            type: 'update_lat',
            payload: {lat: position.coords.latitude},
          });
          dispatch({
            type: 'update_lon',
            payload: {lat: position.coords.longitude},
          });

          //http://192.168.137.1:3030/list

          const {data} = await axios.post(
            'http://192.168.91.236:3030/place-offer-list',
            JSON.stringify({
              lat: position.coords.latitude,
              long: position.coords.longitude,
              distance: distance,
              selectedItems: selectedItems,
            }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log('favorites data : ', data);
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error('Veri alınamadı:', error);
          setError(true);
          setLoading(false);
        }
      },
      error => {
        console.error('Konum alınamadı:', error);
        setLocation(null);
        setError(true);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleAnimeteToRegion = () => {
    this.map.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000,
    );
  };

  const findMe = async () => {
    await getLocation();
    handleAnimeteToRegion();
  };

  const handleCategorySelect = item => {
    navigation.navigate('PlaceOfferDetails', {item});
  };

  const renderPlace = ({item}) => (
    <NextFindPlaceCard
      place={item}
      onSelect={() => handleCategorySelect(item)}
    />
  );
  const handleSavedToggle = () => {
    // savedDatas();
  };

  const handleFavoriteToggle = () => {
    // savedDatas();
  };

  const renderPlaceOffer = ({item}) => {
    console.log('BURAYA GELDİ ');
    <CustomCard
      place={item}
      onSelect={() => handleCategorySelect(item)}
      onFavoriteToggle={handleFavoriteToggle}
      onSavedToggle={handleSavedToggle}
    />;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorViewer />;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={style.container}>
          {location ? (
            <MapView
              ref={map => {
                this.map = map;
              }}
              provider={PROVIDER_GOOGLE}
              style={style.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              <Marker coordinate={location.coords} />
            </MapView>
          ) : (
            <></>
          )}
          <Button
            icon={{
              name: 'format-list-bulleted',
              size: 25,
              color: 'black',
            }}
            iconContainerStyle={{margin: 5}}
            buttonStyle={{
              backgroundColor: '#e6e6e6',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 55,
              position: 'absolute',
              top: StatusBar.currentHeight + 10,
              right: 0,
              left: 10,
            }}
            onPress={() => {
              drawer.toggleDrawer();
            }}
          />
          <Button
            icon={{
              name: 'find-replace',
              size: 25,
              color: 'white',
            }}
            iconContainerStyle={{margin: 5}}
            buttonStyle={{
              backgroundColor: 'rgba(199, 43, 98, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 55,
              position: 'absolute',
              top: StatusBar.currentHeight + 10,
              left: Dimensions.get('window').width - 65,
            }}
            onPress={async () => {
              await findMe();
            }}
          />

          <View style={style.listContainer}>
            {getData ? (
              <FlatList
                style={style.flatList}
                data={getData.data}
                renderItem={renderPlaceOffer}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default MeGeolocation;

const style = StyleSheet.create({
  container: {
    flex: 1,
    //...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  body: {
    width: 200,
    height: 200,
    //position: 'absolute',
  },
  absolute: {
    position: 'absolute',
    height: 200,
    width: 200,
    bottom: 0,
  },
  placeList: {
    //position: 'absolute',
    bottom: 10,
    heigt: 100,
    width: 100,
    backgroundColor: '#64dd30',
  },
  map: {
    /*
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    */
    /*
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '33%',
    */
    flex: 2,
  },
  listContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '33%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },

  flatList: {
    //zIndex: 1,
    /*
    left: 10,
    right: 10,
    height: '33.0%',
    position: 'absolute',
    backgroundColor: 'blue',
    */
    flex: 1,
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
  },
});
