import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './nextFindPlaceCard.style';
import {Card, Divider} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const NextFindPlaceCard = ({place, onSelect}) => {
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <Card style = {style.container}>
        <Card.Title style={style.title}>{place.placeName}</Card.Title>
        <Card.Divider />
        <View
          style={{
            margin: 2,
            flexDirection: 'row',
          }}>
          <Image source={place.imgUrl} style={style.image} />
          <View style={{flex: 1, justifyContent: 'center',alignItems:"center"}}>
            <Text style={style.text}>
              {place.placeType}
            </Text>
            <Text style={style.text}>
              {place.distance} m
            </Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default NextFindPlaceCard;
