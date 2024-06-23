import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PlaceOfferCard from '../../components/placesOfferCard/placeOfferCard';
import CustomCard from '../../components/customCard/customCard';
import useFetch from '../../hooks/useFetch';
import useFetchPost from '../../hooks/useFetchPost';
import Loading from '../../components/loading';
import ErrorViewer from '../../components/error';
import {useSelector} from 'react-redux';

const PlaceOffers = props => {
  const navigation = props.navigation;
  const {distance, selectedItems} = props.route.params;
  const lat = useSelector(selector => selector.lat);
  const lon = useSelector(selector => selector.lon);
  //console.log('PRINT =>', placeType, '  ', selectedItems);
  //const {error, loading, data} = useFetch('/list');

  /*
  const {error, loading, data} = useFetchPost('/place-offer-list', {
    selectedItems: selectedItems,
  }); 
  */

  const {error, loading, data} = useFetchPost('/distance-places', {
    lat: lat,
    lon: lon,
    distance: distance,
    selectedItems: selectedItems,
  });
  console.log('data POST ==> ', data);

  // const [location, setLocation] = useState<GeoPosition | null>(null);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorViewer />;
  }

  const handleCategorySelect = item => {
    navigation.navigate('PlaceOfferDetails', {item});
  };

  const renderPlaceOffer = ({item}) => (
    <CustomCard place={item} onSelect={() => handleCategorySelect(item)} />
  );

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <View style={styles.center}>
        {data ? (
          <FlatList
            data={data.data}
            renderItem={renderPlaceOffer}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
          />
        ) : (
          <Text>Hata var</Text>
        )}
      </View>
    </LinearGradient>
  );
};

export default PlaceOffers;

const styles = StyleSheet.create({
  container: {},
  center: {
    alignItems: 'center',
  },
});
