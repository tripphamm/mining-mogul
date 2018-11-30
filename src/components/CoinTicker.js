import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  incrementCoinCount as incrementCoinCountAC,
} from 'redux/actionCreators';

import {
  coinsPerSecondSelector,
} from 'redux/selectors';


class CoinTicker extends React.Component {
  static propTypes = {
    coinsPerSecond: PropTypes.number.isRequired,
    ticksPerSecond: PropTypes.number.isRequired,
    incrementCoinCount: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onTick = this.onTick.bind(this);
    this.initializeTicker = this.initializeTicker.bind(this);
    this.destroyTicker = this.destroyTicker.bind(this);
  }

  componentDidMount() {
    this.initializeTicker();
  }

  componentWillUnmount() {
    this.destroyTicker();
  }

  onTick() {
    const {
      coinsPerSecond,
      ticksPerSecond,
      incrementCoinCount,
    } = this.props;

    const coinsPerTick = coinsPerSecond / ticksPerSecond;

    incrementCoinCount(coinsPerTick);
  }

  /**
   * Clears the existing ticker and creates a new ticker
   */
  initializeTicker() {
    const {
      ticksPerSecond,
    } = this.props;

    if (this.tickerId !== undefined) {
      this.destroyTicker();
    }

    this.tickerId = setInterval(this.onTick, (1000 / ticksPerSecond));
  }

  destroyTicker() {
    clearInterval(this.tickerId);
  }

  render() {
    return (<div />);
  }
}

function mapStateToProps(state) {
  return {
    coinsPerSecond: coinsPerSecondSelector(state),
    ticksPerSecond: state.ticksPerSecond,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCoinCount: amount => dispatch(incrementCoinCountAC(amount)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinTicker);
