import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import Section from './Section';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  logoWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F7F7',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,

  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    right: 70,
    backgroundColor: '#fff',
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,

  },
  vendorWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  vendorTotalItemsText: {
    color: 'gray',
  },
  vendorDetailBtnText: {
    color: '$buttonBackgroundColor',
    fontSize: '0.9rem',
  },
  vendorName: {
    fontSize: 20,
    textAlign: 'left',
    color: '#25AAE1',
    fontWeight: 'bold',
  }
});

/**
 * Renders vendor information.
 *
 * @param {function} onViewDetailPress - Opens vendor detail page.
 * @param {string} logoUrl - Logo url.
 * @param {number} productsCount - Number of vendor products.
 *
 * @return {JSX.Element}
 */
const VendorInfo = ({ onViewDetailPress, logoUrl, productsCount, company_id, company, companyId }) => (
  <Section containerStyle={{ paddingTop: 0 }} wrapperStyle={{ padding: 0 }}>
    <View style={styles.logoWrapper}>
      <Image source={{ uri: logoUrl }} style={styles.logo} />
      <Text onPress={() => {
                                  nav.showModalVendor({
                                    companyId: company_id,
                                  });
                                }} style={styles.vendorName}>{company}</Text>
    </View>
  </Section>
);

/**
 * @ignore
 */
VendorInfo.propTypes = {
  productsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  logoUrl: PropTypes.string,
  onViewDetailPress: PropTypes.func,
};

export default VendorInfo;
