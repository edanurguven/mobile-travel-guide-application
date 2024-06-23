import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useState, useEffect, useRef} from 'react';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/themed';

import MapCard from '../components/mapCard/mapCard';
import useFetch from '../hooks/useFetch';
import ErrorViewer from '../components/error';
import Loading from '../components/loading';
import axios from 'axios';

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

const FirstScreen = props => {
  const navigation = props.navigation;
  const {error: getError, data, loading: getLoading} = useFetch('/list');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [getdata, setData] = useState();
  const [secondLocation, setSecondLocation] = useState(null);
  const lat = useSelector(state => state.lat);
  const lon = useSelector(state => state.lon);
  console.log('lat: ', lat, '  lon : ', lon);
  const drawer = useNavigation();
  const mapRef = useRef(null);

  const latornek = 41.5137972;
  const lonornek = 36.1087636;
  const distance = 10000;
  const selectedItems = ['Restoran'];
  const dispatch = useDispatch();

  if (getLoading) {
    <Loading />;
  }

  if (getError) {
    <ErrorViewer />;
  }

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
            payload: {lon: position.coords.longitude},
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
          //console.log('favorites data : ', data);
          //setData(data);
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
    console.log('ÇALIŞTI:');
    getLocation();
  }, []);

  /*
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
  }; */
  const handleAnimateToRegion = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000,
      );
    }
  };
  const findMe = async () => {
    await getLocation();
    //handleAnimeteToRegion();
    handleAnimateToRegion();
  };

  // Method to fit the map view to show both markers
  const handleShowSecondMarker = item => {
    const newLocation = {
      latitude: item.latitude, // Replace with your second marker's latitude
      longitude: item.longitude, // Replace with your second marker's longitude
    };
    setSecondLocation(newLocation);

    if (mapRef.current) {
      mapRef.current.fitToCoordinates([location.coords, newLocation], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  };

  const handleGoogleMap = item => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${latornek},${lonornek}&destination=${item.latitude},${item.longitude}&travelmode=driving`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening Google Maps', err),
    );
  };

  const handleCategorySelect = item => {
    //map func
    navigation.navigate('PlaceOfferDetails', {item});
  };

  const renderPlaceOffer = ({item}) => (
    <MapCard
      place={item}
      onSelect={() => handleCategorySelect(item)}
      placeShow={() => handleShowSecondMarker(item)}
      onSendGoogleMap={() => handleGoogleMap(item)}
    />
  );
  /*
  ref={map => {
              this.map = map;
            }}
  */

  return (
    <View style={{flex: 1}}>
      {location ? (
        <View style={{...StyleSheet.absoluteFillObject, flex: 1}}>
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker coordinate={location.coords} />
            {secondLocation && <Marker coordinate={secondLocation} />}
          </MapView>
        </View>
      ) : (
        <Loading />
      )}

      <View style={{height: Dimensions.get('window').height - 200}}>
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
            top: Dimensions.get('window').height - 250,
            left: Dimensions.get('window').width - 65,
          }}
          onPress={async () => {
            await findMe();
          }}
        />
      </View>
      <View style={{height: 170}}>
        <FlatList
          data={data.data}
          renderItem={renderPlaceOffer}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      </View>
    </View>
  );
};

export default FirstScreen;
