import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'react-grid-system';


import {
  incrementCoinCount as incrementCoinCountAC,
} from 'redux/actionCreators';

import {
  coinsPerClickSelector,
  coinsPerSecondSelector,
  numberFormatSelector,
  affordableUpgradeCountSelector,
} from 'redux/selectors';

import UpgradePanel from 'components/UpgradePanel';
import CoinCount from 'components/CoinCount';
import Rates from 'components/Rates';
import CoinTicker from 'components/CoinTicker';
import ClickableCoin from 'components/ClickableCoin';

const appBarHeight = 56;

class App extends Component {
  static propTypes = {
    coinCount: PropTypes.number.isRequired,
    coinsPerClick: PropTypes.number.isRequired,
    coinsPerSecond: PropTypes.number.isRequired,
    // affordableUpgradeCount: PropTypes.number.isRequired,
    incrementCoinCount: PropTypes.func.isRequired,
    numberFormat: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.onCoinClick = this.onCoinClick.bind(this);
  }

  onCoinClick() {
    const {
      coinsPerClick,
      incrementCoinCount,
    } = this.props;

    incrementCoinCount(coinsPerClick);
  }

  render() {
    const {
      coinCount,
      coinsPerSecond,
      coinsPerClick,
      numberFormat,
    } = this.props;

    return (
      <div>
        <CoinTicker />
        <Container
          style={{
            height: `calc(100vh - ${appBarHeight}px`,
            overflow: 'hidden',
          }}
          fluid
        >
          <Row style={{ marginTop: 20 }}>
            <Col md={3}>
              <UpgradePanel />
            </Col>
            <Col md={9}>
              <Row>
                <Col xs={12} md={9} style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CoinCount
                      coinCount={coinCount}
                      numberFormat={numberFormat}
                    />
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <Rates
                    coinsPerClick={coinsPerClick}
                    coinsPerSecond={coinsPerSecond}
                  />
                </Col>
              </Row>
              <Row style={{ height: '70%' }}>
                <Col md={9}>
                  <ClickableCoin onClick={this.onCoinClick} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ticksPerSecond: state.ticksPerSecond,
    coinCount: state.coinCount,
    coinsPerClick: coinsPerClickSelector(state),
    coinsPerSecond: coinsPerSecondSelector(state),
    affordableUpgradeCount: affordableUpgradeCountSelector(state),
    numberFormat: numberFormatSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCoinCount: amount => dispatch(incrementCoinCountAC(amount)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
