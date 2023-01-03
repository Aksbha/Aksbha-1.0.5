import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swipeout from 'react-native-swipeout';
import { get } from 'lodash';
import { connect } from 'react-redux';

// Components
import { QtyOption } from './QtyOption';
import Icon from '../components/Icon';

// Links
import i18n from '../utils/i18n';
import { getImagePath, isPriceIncludesTax } from '../utils';

// Theme
import theme from '../config/theme';

// Styles
const styles = EStyleSheet.create({
  productItemWrapper: {
    marginBottom: 15,
  },
  productItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    flexDirection: 'row',
    paddingBottom: 8,
    padding: 14,
    width: '100%',
    overflow: 'hidden',
  },
  productItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productItemDetail: {
    marginLeft: 14,
    marginRight: 14,
    width: '70%',
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
    textAlign: 'left',
  },
  qtyContainer: {
    position: 'absolute',
    right: 20,
    bottom: 15,
  },
  removeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  removeItemText: {
      color: '#6D6D6D',
    },
    removeItemIcon: {
        color: '#6D6D6D',
    },
    rightArrowIcon: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      textAlign: 'right'
    }
});

/**
 * Renders a product.
 *
 * @param {object} cartActions - Cart actions.
 * @param {object} item - Product infromation.
 *
 * @return {JSX.Element}
 */
const CartProductItem = ({ cartActions, item, cart }) => {
  /**
   * Changes the quantity of product.
   *
   * @param {object} item - Product infromation.
   * @param {number} amount - Amount of product.
   */
  const handleChangeAmountRequest = (item, amount) => {
    const newItem = { ...item, amount, coupons: cart.coupons };
    cartActions.change(newItem.cartId, newItem);
  };

  /**
   * Removes product.
   *
   * @param {object} product - Product infromation.
   */
  const handleRemoveProduct = (product) => {
    cartActions.remove(product.cartId, cart.coupons);
  };

  /**
   * Gets product image path. Creats image component.
   */
  let productImage = null;
  const imageUri = getImagePath(item);
  if (imageUri) {
    productImage = (
      <Image source={{ uri: imageUri }} style={styles.productItemImage} />
    );
  }

  /**
   * Settings of swipeout.
   */
  /*const swipeoutBtns = [
    {
      text: i18n.t('Delete'),
      type: 'delete',
      onPress: () => handleRemoveProduct(item),
    },
  ];*/

  /**
   * Settings for choosing the quantity of product.
   */
  const step = parseInt(item.qty_step, 10) || 1;
  const max = parseInt(item.max_qty, 10) || parseInt(item.in_stock, 10);
  const min = parseInt(item.min_qty, 10) || step;
  const initialValue = parseInt(item.amount, 10);

  /**
   * Calculates price of product including taxes.
   */
  const productTaxedPrice = get(item, 'display_price_formatted.price', '');
  const productPrice =
    productTaxedPrice || get(item, 'price_formatted.price', '');
  const showTaxedPrice = isPriceIncludesTax(item);

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  return (
    <View style={styles.productItemWrapper}>
        <View style={styles.productItem}>
          {productImage}
          <View style={styles.productItemDetail}>
            <Text style={styles.productItemName} numberOfLines={1}>
              {item.product}
            </Text>
            <Text style={styles.productItemPrice}>
              {`${item.amount} x ${productPrice}`}
              {showTaxedPrice && (
                <Text style={styles.smallText}>
                  {` (${i18n.t('Including tax')})`}
                </Text>
              )}
            </Text>
            <TouchableOpacity style={styles.removeItem} onPress={() => handleRemoveProduct(item)}>
                            <Icon style={styles.removeItemIcon} size={20} name="remove-circle-outline"/>
                            <Text style={styles.removeItemText}>
                                Remove
                            </Text>
                          </TouchableOpacity>
          </View>
          <View style={styles.qtyContainer}>
            {!item.exclude_from_calculate && (
              <QtyOption
                max={max}
                min={min}
                initialValue={initialValue}
                step={step}
                onChange={(val) => {
                  if (
                    val <= parseInt(item.in_stock, 10) ||
                    item.out_of_stock_actions === 'B'
                  ) {
                    cartActions.changeAmount(item.cartId, val, item.company_id);
                    handleChangeAmountRequest(item, val);
                  }
                }}
              />
            )}
          </View>
        </View>
    </View>
  );
};

CartProductItem.propTypes = {
  cartActions: PropTypes.shape({}),
  item: PropTypes.shape({}),
};

export default connect((state) => ({
  cart: state.cart,
}))(CartProductItem);
