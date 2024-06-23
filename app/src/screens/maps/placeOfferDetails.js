import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import {Divider, Card, ControlledTooltip} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {Button, Rating, RatingProps} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import controlDb from '../../auth/controlDb';
import StarRating from '../../components/customRating';
import {CardImage} from '@rneui/base/dist/Card/Card.Image';

const PlaceOfferDetails = props => {
  const navigation = props.navigation;
  const {item} = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [rate, setRate] = useState(-1);
  console.log('item : ', item);
  const lat = useSelector(selector => selector.lat);
  const lon = useSelector(selector => selector.lon);

  const latornek = 41.5137972;
  const lonornek = 36.1087636;

  const handleGoogleMap = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${item.latitude},${item.longitude}&travelmode=driving`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening Google Maps', err),
    );
  };

  const okButton = async () => {
    try {
      if (rate !== -1) {
        await controlDb.addPoint(item.placeId, rate);
      }
      setModalVisible(false);
    } catch (error) {
      return;
    }
  };

  const exitButton = () => {
    setModalVisible(!modalVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const ratingCompleted = rating => {
    setRate(rating);
  };

  const startValue = async () => {
    try {
      return await controlDb.getPoint(item.placeId);
    } catch (error) {
      return 0;
    }
  };

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
        <CardImage
          style={style.image}
          source={{
            uri: item.imgUrl,
          }}
        />
        <View style={style.containerStyle}>
          <View style={{textAlign: 'center'}}>
            <Text style={style.title}>{item.placeName}</Text>
          </View>
          <Divider inset={true} insetType="middle" />
          <View style={style.containerBody}>
            <View style={style.containerTitle}>
              <Text style={style.textBold}>Mekan Türü : </Text>
              <Text style={style.text}>{item.placeType}</Text>
            </View>
            <Text style={style.textBold}>Özellikler</Text>
            {item.description.map((desc, index) => (
              <Text style={style.text} key={index}>
                - {desc}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Button
            title="Puanla"
            containerStyle={{
              height: 40,
              width: 200,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
            buttonStyle={{backgroundColor: 'rgba(255, 193, 7, 1)'}}
            titleStyle={{
              color: 'white',
              marginHorizontal: 20,
            }}
            onPress={toggleModal}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={handleGoogleMap} style={style.favorite}>
              <Icon name={'map'} size={23} color={'#4cc9f0'} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={style.modalContainer}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Buraya bir puan verin!</Text>
            <View style={style.modalRating}>
              <StarRating rating={rate} onRatingChange={ratingCompleted} />
            </View>
            <View style={style.modalButtons}>
              <Button
                title="Tamam"
                onPress={value => {
                  console.log('valeu : ', item);
                  setRate(item);
                  okButton();
                }}
                containerStyle={style.modalButton}
              />
              <Button
                title="İptal"
                onPress={exitButton}
                containerStyle={style.modalButton}
                buttonStyle={{backgroundColor: 'red'}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default PlaceOfferDetails;

const style = StyleSheet.create({
  container: {
    margin: 25,
    flex: 1,
  },
  title: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    color: '#4361ee',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textBold: {
    fontFamily: 'Nunito-Regular',
    color: '#4361ee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    color: 'black',
    fontSize: 16,
  },
  image: {
    marginVertical: 15,
    resizeMode: 'cover',
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height / 3,
    borderRadius: 10,
  },
  containerStyle: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 50,
  },
  containerTitle: {
    fontFamily: 'Nunito-Regular',
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 10,
  },
  containerBody: {
    padding: 10,
  },
  favorite: {
    borderRadius: 50,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontFamily: 'Nunito-Regular',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  modalRating: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    marginBottom: 10,
  },
});
