import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import PlaceOfferCard from '../../components/placesOfferCard/placeOfferCard';
import CustomCard from '../../components/customCard/customCard';
import Loading from '../../components/loading';
import ErrorViewer from '../../components/error';
import controlDb from '../../auth/controlDb';
import Nothing from '../../components/nothingA';
import {useSelector} from 'react-redux';

const FavoritesScreen = props => {
  const navigation = props.navigation;
  const [favDataList, setFavDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const email = useSelector(state => state.email);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      favoriteDatas();
    });
    favoriteDatas();
    return unsubscribe;
  }, [navigation]);

  const favoriteDatas = async () => {
    try {
      const favs = await controlDb.getFavorites(email);
      const response = await axios.post(
        'http://192.168.91.236:3030/fav-places',
        {
          favs: favs,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('response data fav : ', response.data.data);
      setFavDataList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('There was an error!', error);
      setError(true);
    }
  };

  const handleFavoriteToggle = () => {
    favoriteDatas();
  };
  const handleSavedToggle = () => {
    savedDatas();
  };

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
    <CustomCard
      place={item}
      onSelect={() => handleCategorySelect(item)}
      onFavoriteToggle={handleFavoriteToggle}
      onSavedToggle={handleSavedToggle}
    />
  );

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={styles.container}>
      <View style={{marginBottom: 20, alignItems: 'center', flex: 1}}>
        {favDataList.length > 0 ? (
          <FlatList
            data={favDataList}
            renderItem={renderPlaceOffer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.text}>Henüz favorin yok!</Text>
            <Nothing />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignItems: 'center',
    color: '#f5f6fa',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
