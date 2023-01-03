import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from './Icon';

const styles = EStyleSheet.create({
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#B4B5B7',
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#F8F7F7',
    marginTop: 10
  },
  itemText: {
    color: '$menuTextColor',
    fontSize: '0.8rem',
    paddingLeft: 15
  },
  checkIcon: {
    fontSize: '1rem',
    color: '$menuTextColor',
  },
});

export const RadioButtonItem = ({ item, onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(item)}
      style={styles.itemWrapper}>
      <Text style={styles.itemText}>{title}</Text>
      {item.selected && <Icon name="check" style={styles.checkIcon} />}
    </TouchableOpacity>
  );
};
