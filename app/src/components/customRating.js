import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({
  maxStars = 5,
  rating,
  onRatingChange,
  editable = true,
}) => {
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleStarPress = starIndex => {
    if (editable) {
      setCurrentRating(starIndex);
      onRatingChange(starIndex);
    }
  };

  return (
    <View style={styles.starContainer}>
      {Array.from({length: maxStars}).map((_, index) => {
        const starIndex = index + 1;
        return (
          <TouchableOpacity
            key={starIndex}
            onPress={() => handleStarPress(starIndex)}
            disabled={!editable}>
            <Icon
              name={starIndex <= currentRating ? 'star' : 'star-o'}
              size={20}
              color={starIndex <= currentRating ? '#FFD700' : '#ccc'}
              style={styles.star}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
});

export default StarRating;
