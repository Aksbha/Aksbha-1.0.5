import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from './Button';
import i18n from '../utils/i18n';
import { formatPrice } from '../utils';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30
  },
  cartInfoTitle: {
    color: '#000',
  },
  cartInfoTotal: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#000',
  },
  placeOrderBtn: {
    backgroundColor: '#662D91',
    padding: 20,
    marginRight: 0,
    minWidth: 225
  }
});

/**
 * Cart footer.
 *
 * @reactProps {string} totalPrice - The total amount of the order.
 * @reactProps {string} btnText - Text on the footer button.
 * @reactProps {function} onBtnPress - Push function.
 * @reactProps {boolean} isBtnDisabled - Button activity flag.
 */
export default class extends PureComponent {
  /**
   * @ignore
   */
  static propTypes = {
    totalPrice: PropTypes.string,
    btnText: PropTypes.string,
    onBtnPress: PropTypes.func,
    isBtnDisabled: PropTypes.bool,
  };

  /**
   * Renders component.
   *
   * @returns {JSX.Element}
   */
  render() {
    const { onBtnPress, totalPrice, isBtnDisabled, btnText } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.cartInfoTitle}>
            {i18n.t('Total').toUpperCase()}
          </Text>
          <Text style={styles.cartInfoTotal}>{formatPrice(totalPrice)}</Text>
        </View>
        <Button
          style={styles.placeOrderBtn}
          onPress={() => onBtnPress()}
          disabled={isBtnDisabled}>
          <Text style={styles.placeOrderBtnText}>{btnText}</Text>
        </Button>
      </View>
    );
  }
}
