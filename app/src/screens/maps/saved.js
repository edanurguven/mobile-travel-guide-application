import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import CustomCard from '../../components/customCard/customCard';
import Loading from '../../components/loading';
import ErrorViewer from '../../components/error';
import controlDb from '../../auth/controlDb';
import Nothing from '../../components/nothingA';
import {useSelector} from 'react-redux';

const SavedScreen = props => {
  const navigation = props.navigation;
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const email = useSelector(state => state.email);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      savedDatas();
    });
    savedDatas();
    return unsubscribe;
  }, [navigation]);

  const savedDatas = async () => {
    try {
      const saved = await controlDb.getSaved(email);
      const response = await axios.post(
        'http://192.168.91.236:3030/array-data-list',
        {
          saved: saved,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('response data saved : ', response.data.data);
      setSavedList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('There was an error!', error);
      setError(true);
    }
  };

  const handleSavedToggle = () => {
    savedDatas();
  };

  const handleFavoriteToggle = () => {
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
        {savedList.length > 0 ? (
          <FlatList
            data={savedList}
            renderItem={renderPlaceOffer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.text}>Henüz kaydedilen yok!</Text>
            <Nothing />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default SavedScreen;

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
    fontFamily: 'Nunito-Regular',
    alignItems: 'center',
    color: '#f5f6fa',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
