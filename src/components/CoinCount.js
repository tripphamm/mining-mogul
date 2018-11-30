import React from 'react';
import PropTypes from 'prop-types';

import { fontFamily } from 'settings/theme';
import withScaledProps, { withScaledPropsPropTypes } from 'components/hocs/withScaledProps';
import Number from 'components/Number';
import Bitcoin from 'components/Logos/Bitcoin';

@withScaledProps({
  fontSize: {
    minValue: 30,
    maxValue: 60,
  },
})
class CoinCount extends React.Component {
  static propTypes = {
    coinCount: PropTypes.number.isRequired,
    numberFormat: PropTypes.string.isRequired,
    ...withScaledPropsPropTypes,
  }

  render() {
    const {
      coinCount,
      numberFormat,
      scaledProps,
    } = this.props;

    const {
      fontSize,
    } = scaledProps;

    return (
      <div
        style={{
          fontSize,
          fontFamily,
        }}
      >
        <Bitcoin
          height={50}
          width={50}
        />
        <Number
          value={coinCount}
          format={numberFormat}
        />
      </div>
    );
  }
}

export default CoinCount;
