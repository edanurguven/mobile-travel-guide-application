import {View, StyleSheet, Text} from 'react-native';
import {useState, useEffect} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/loading';
import useFetchPost from '../../hooks/useFetchPost';
import LinearGradient from 'react-native-linear-gradient';
import CustomCard from '../../components/customCard/customCard';
import ErrorViewer from '../../components/error';
import controlDb from '../../auth/controlDb';
import axios from 'axios';

const Example = props => {
  const navigation = props.navigation;

  const [nearPlace, setNearPlace] = useState([]);
  const [favDataList, setFavDataList] = useState([]);
  const [errorFav, setErrorFav] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [topFavList, setTopFavList] = useState([]);
  const [loadingTopFav, setLoadingTopFav] = useState(false);
  const [errorTopFav, setErrorTopFav] = useState(false);

  const lat = useSelector(state => state.lat);
  const lon = useSelector(state => state.lon);
  const email = useSelector(state => state.email);
  const distance = 5000; // example distance

  const {error, loading, data} = useFetchPost('/distance', {
    lat: lat,
    lon: lon,
    distance: distance,
  });

  const topFav = async () => {
    try {
      setLoadingTopFav(true);
      const topFavData = await controlDb.getTopPlaces();
      const response = await axios.post(
        'http://192.168.91.236:3030/top-fav-places',
        {
          favs: topFavData,
        },
      );
      setTopFavList(response.data.data);
      setLoadingTopFav(false);
    } catch (error) {
      setErrorTopFav(true);
      setLoadingTopFav(false);
    }
  };

  const handleCategorySelect = item => {
    navigation.navigate('PlaceOfferDetails', {item});
  };

  const renderPlaceOffer = ({item}) => (
    <CustomCard
      place={item}
      onSelect={() => handleCategorySelect(item)}
      onFavoriteToggle={handleFavoriteToggle}
      onSavedToggle={handleSavedToggle}
    />
  );
  useEffect(() => {
    if (data) {
      setNearPlace(data);
    }
  });

  useEffect(() => {
    topFav();
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorViewer />;
  }

  const handleFavoriteToggle = () => {
    favoriteData();
  };
  const handleSavedToggle = () => {
    savedDatas();
  };

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <ScrollView style={{marginBottom: 5}}>
        <View style={styles.center}>
          <Text style={styles.titleHeader}>Yakınınızda Gezilecek Yerler:</Text>
          {data ? (
            <FlatList
              data={data.data}
              renderItem={renderPlaceOffer}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={styles.center}>
          <Text style={styles.titleHeader}>En Beğenilenler:</Text>
          {topFavList.length > 0 ? (
            <FlatList
              data={topFavList}
              renderItem={renderPlaceOffer}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Example;

const styles = StyleSheet.create({
  container: {},
  center: {
    // alignItems: 'center',
  },
  titleHeader: {
    fontFamily: 'Nunito-Regular',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
});
