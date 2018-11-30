import React from 'react';
import PropTypes from 'prop-types';

import { fontFamily } from 'settings/theme';
import withScaledProps, { withScaledPropsPropTypes } from 'components/hocs/withScaledProps';
import Number from 'components/Number';

@withScaledProps({
  fontSize: {
    minValue: 20,
    maxValue: 40,
  },
})
class Rates extends React.Component {
  static propTypes = {
    coinsPerClick: PropTypes.number.isRequired,
    coinsPerSecond: PropTypes.number.isRequired,
    ...withScaledPropsPropTypes,
  }

  render() {
    const {
      coinsPerClick,
      coinsPerSecond,
      scaledProps,
    } = this.props;

    const {
      fontSize,
    } = scaledProps;

    return (
      <div>
        <div style={{ fontSize: 20, fontFamily }}>Coins per click:</div>
        <Number
          style={{ fontSize, fontFamily }}
          value={coinsPerClick}
        />
        <div style={{ fontSize: 20, fontFamily }}>Coins per second:</div>
        <Number
          style={{ fontSize, fontFamily }}
          value={coinsPerSecond}
        />
      </div>
    );
  }
}

export default Rates;
