import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StarRating from './StarRating'; // Adjust the path accordingly

const CardWithRating = ({rating}) => {
  return (
    <View style={styles.card}>
      <StarRating rating={rating} editable={false} />
    </View>
  );
};

export default CardWithRating;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
