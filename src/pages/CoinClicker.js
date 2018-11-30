import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';

import {
  incrementCoinCount as incrementCoinCountAC,
} from 'redux/actionCreators';

import {
  coinsPerClickSelector,
  coinsPerSecondSelector,
  affordableUpgradeCountSelector,
} from 'redux/selectors';

import AppShell from 'components/AppShell';
import Rates from 'components/Rates';
import ClickableCoin from 'components/ClickableCoin';

class CoinClicker extends React.Component {
  static propTypes = {
    coinsPerClick: PropTypes.number.isRequired,
    coinsPerSecond: PropTypes.number.isRequired,
    incrementCoinCount: PropTypes.func.isRequired,
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
      coinsPerSecond,
      coinsPerClick,
    } = this.props;

    return (
      <AppShell>
        <Container>
          <Row style={{ height: '50vh' }}>
            <Col>
              <ClickableCoin onClick={this.onCoinClick} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Rates coinsPerClick={coinsPerClick} coinsPerSecond={coinsPerSecond} />
            </Col>
          </Row>
        </Container>
      </AppShell>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCoinCount: amount => dispatch(incrementCoinCountAC(amount)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinClicker);
