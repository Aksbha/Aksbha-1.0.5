import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import i18n from '../utils/i18n';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  addToCartBtnText: {
    textAlign: 'center',
    color: '$buttonWithBackgroundTextColor',
    fontSize: 16,
  },
  addToCartBtn: {
    backgroundColor: '#662D91',
    padding: 20,
    width: 200,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const AddToCartButton = ({ onPress, buttonStyle, textStyle, title }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.addToCartBtn, ...buttonStyle }}
      onPress={onPress}>
      <Text style={{ ...styles.addToCartBtnText, ...textStyle }}>
        {i18n.t(title).toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
