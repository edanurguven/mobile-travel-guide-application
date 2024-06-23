import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './placeOfferCard.style';
import {Card, Divider} from '@rneui/themed';
import controlDb from '../../auth/controlDb';
import {useSelector} from 'react-redux';

const PlaceOfferCard = ({place, onSelect, onFavoriteToggle}) => {
  const [isFavorite, setFavorite] = useState(false);
  const email = useSelector(state => state.email);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const result = await controlDb.oneOfFavorites(place.placeId, email);
      setFavorite(result);
    };

    fetchFavoriteStatus();
  }, [place.placeId]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await controlDb.deleteFromFavorites(place.placeId, email);
      setFavorite(false);
      onFavoriteToggle();
    } else {
      await controlDb.addFavorite(place.placeId, email);
      setFavorite(true);
      onFavoriteToggle(place.placeId, true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <Card containerStyle={{borderRadius: 20, borderColor: '#9D00FF'}}>
        <Card.Title style={style.title}>{place.placeName}</Card.Title>
        <Card.Divider />
        <View
          style={{
            margin: 2,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../../assets/img/uygResim.jpg')}
            style={style.image}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <Text style={{marginLeft: 10, fontSize: 18, color: 'black'}}>
                {place.placeType}
              </Text>
            </View>

            <TouchableOpacity onPress={toggleFavorite} style={style.favorite}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-o'}
                size={25}
                color={isFavorite ? '#9D00FF' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default PlaceOfferCard;
