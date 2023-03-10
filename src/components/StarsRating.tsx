import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = (iconSize: number | null) =>
  EStyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    iconWrapper: {
      paddingVertical: 3,
      marginRight: 2,
    },
    icon: {
      tintColor: '$ratingStarsColor',
      width: 12,
      height: 12,
    },
  });

interface StarsRatingProps {
  size: number;
  value: number;
  isRatingSelectionDisabled: boolean;
  count?: number;
  onFinishRating?: Function;
  containerStyle?: object;
  isEmpty?: boolean;
}

export const StarsRating: React.FC<StarsRatingProps> = ({
  size,
  value,
  isRatingSelectionDisabled,
  count = 5,
  onFinishRating,
  containerStyle,
  isEmpty,
}) => {
  const [stars, setStars] = useState([{ isActive: true }]);

  const ratingHandler = useCallback(
    (index: string) => {
      const newValue = [];
      for (let i = 0; i < count; i++) {
        const starObject = { isActive: i < index };
        newValue.push(starObject);
        //newValue.push("1");
      }
      setStars(newValue);
      if (onFinishRating) {
        return onFinishRating(index);
      }
    },
    [count, onFinishRating],
  );

  useEffect(() => {
    ratingHandler(Math.floor(value));
  }, [ratingHandler, value]);

  const renderStar = (star: { isActive: boolean }, index: number) => {
    let path = star.isActive
      ? require('../assets/filled_star.png')
      : require('../assets/unfilled_star.png');

    if (value - index >= 0.25 && value - index < 0.75) {
      path = require('../assets/halffilled_star.png');
    }

    return (
      <TouchableOpacity
        style={styles(null).iconWrapper}
        key={index}
        onPress={
          isRatingSelectionDisabled ? undefined : () => ratingHandler(index + 1)
        }
        activeOpacity={isRatingSelectionDisabled ? 1 : 0.2}>
        <Image style={styles(size).icon} source={path} />
      </TouchableOpacity>
    );
  };

  if (!value && !isEmpty) {
    return null;
  }

  return (
    <View style={{ ...styles(null).container, ...containerStyle }}>
      {stars.map((star, index) => {
        return renderStar(star, index);
      })}
    </View>
  );
};

export default StarsRating;
