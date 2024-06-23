import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './customCard.style';
import {Card, Divider} from '@rneui/themed';
import controlDb from '../../auth/controlDb';
import {CardImage} from '@rneui/base/dist/Card/Card.Image';
import {useSelector} from 'react-redux';
import StarRating from '../customRating';

const CustomCard = ({place, onSelect, onFavoriteToggle, onSavedToggle}) => {
  const [isFavorite, setFavorite] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [rating, setRating] = useState();
  const email = useSelector(state => state.email);

  const fetchStatus = async () => {
    const resultFavorite = await controlDb.oneOfFavorites(place.placeId, email);
    const resultSaved = await controlDb.isThereInArray(place.placeId, email);
    const resultPoint = await controlDb.getPoint(place.placeId);
    setRating(resultPoint);
    setSaved(resultSaved);
    setFavorite(resultFavorite);
  };

  useEffect(() => {
    fetchStatus();
  }, [place.placeId]);

  const sentenceLength = sentence => {
    if (sentence.length >= 27) {
      return sentence.substring(0, 25) + '...';
    } else {
      return sentence;
    }
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await controlDb.deleteFromFavorites(place.placeId, email);
      setFavorite(false);
      onFavoriteToggle();
    } else {
      await controlDb.addFavorite(place.placeId, email);
      setFavorite(true);
      onFavoriteToggle();
    }
  };

  const toggleSaved = async () => {
    if (isSaved) {
      await controlDb.deleteFromSaved(place.placeId, email);
      setSaved(false);
      onSavedToggle();
    } else {
      await controlDb.addSaved(place.placeId, email);
      setSaved(true);
      onSavedToggle();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <Card
        containerStyle={{
          borderRadius: 20,
          // borderColor: '#9D00FF',
          height: 320,
          width: 300,
        }}>
        <CardImage
          style={{
            padding: 0,
            borderRadius: 20,
            resizeMode: 'cover',
            height: 180,
          }}
          source={{
            uri: place.imgUrl,
          }}
        />

        <View>
          <View
            style={{
              //flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, flexDirection: 'column', height: 75}}>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  marginTop: 7,
                  marginHorizontal: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                {sentenceLength(place.placeName)}
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  marginBottom: 10,
                  marginHorizontal: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                Tür: {place.placeType}
              </Text>
            </View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <TouchableOpacity onPress={toggleFavorite} style={style.favorite}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-o'}
                  size={23}
                  color={isFavorite ? '#ff006e' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleSaved} style={style.save}>
                <Icon
                  name={'save'}
                  size={23}
                  color={isSaved ? '#fb5607' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', margin: 7}}>
          <View style={style.star}>
            <StarRating rating={rating} editable={false} />
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default CustomCard;
