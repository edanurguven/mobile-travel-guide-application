import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './mapCard.style';
import {Card, Divider} from '@rneui/themed';
import controlDb from '../../auth/controlDb';
import {useSelector} from 'react-redux';

const MapCard = ({
  place,
  placeShow,
  onSelect,
  onFavoriteToggle,
  onSendGoogleMap,
  onSavedToggle,
}) => {
  const [isFavorite, setFavorite] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [point, setPoint] = useState();
  const email = useSelector(state => state.email);

  const fetchStatus = async () => {
    const resultFavorite = await controlDb.oneOfFavorites(place.placeId, email);
    const resultSaved = await controlDb.isThereInArray(place.placeId, email);
    const resultPoint = await controlDb.getPoint(place.placeId);
    const p = Number(resultPoint).toFixed(1);
    setPoint(p);
    console.log('Result point: ', resultPoint, '    p:', p);
    setFavorite(resultFavorite);
    setSaved(resultSaved);
  };
  useEffect(() => {
    fetchStatus();
  }, [place.placeId]);

  const sentenceLength = sentence => {
    if (sentence.length >= 13) {
      return sentence.substring(0, 13) + '...';
    } else {
      return sentence;
    }
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await controlDb.deleteFromFavorites(place.placeId, email);
      setFavorite(false);
      // onFavoriteToggle();
    } else {
      await controlDb.addFavorite(place.placeId, email);
      setFavorite(true);
      // onSavedToggle();
    }
  };

  const toggleSaved = async () => {
    if (isSaved) {
      await controlDb.deleteFromSaved(place.placeId, email);
      setSaved(false);
      //onSavedToggle();
    } else {
      await controlDb.addSaved(place.placeId, email);
      setSaved(true);
      //onSavedToggle();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={placeShow} onLongPress={onSelect}>
      <Card
        containerStyle={{
          borderRadius: 20,
          backgroundColor: 'white', //'rgba(255, 255, 255, 0.6)', //'#fff5ee',
          height: 150,
          width: 200,
        }}>
        <View>
          <View style={style.header}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={toggleFavorite} style={style.star}>
                <Icon
                  name={false ? 'star' : 'star-o'}
                  size={23}
                  color={'#ffbe0b'}
                />
              </TouchableOpacity>
              <View style={{justifyContent: 'center', marginLeft: 10}}>
                <Text style={style.miniText}>{point}</Text>
              </View>
            </View>

            <Text style={style.text}>{sentenceLength(place.placeName)}</Text>
            <Text style={style.text}>Tür:{place.placeType}</Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              height: 40,
            }}>
            <View style={style.iconContainer}>
              <TouchableOpacity onPress={toggleFavorite} style={style.favorite}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-o'}
                  size={23}
                  color={isFavorite ? '#ff006e' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleSaved} style={style.favorite}>
                <Icon
                  name={'save'}
                  size={23}
                  color={isSaved ? '#fb5607' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSendGoogleMap}
                style={style.favorite}>
                <Icon name={'map'} size={23} color={'#4cc9f0'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default MapCard;
