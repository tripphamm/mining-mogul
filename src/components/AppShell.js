import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'; // CreditCard ?
import ClickIcon from '@material-ui/icons/TouchApp';
import BuildIcon from '@material-ui/icons/Build';

import {
  affordableUpgradeCountSelector,
  numberFormatSelector,
} from 'redux/selectors';

import CoinTicker from 'components/CoinTicker';
import CoinCount from 'components/CoinCount';

// const appBarHeight = 56;
const bottomNavHeight = 56;

class AppShell extends React.Component {
  static propTypes = {
    coinCount: PropTypes.number.isRequired,
    numberFormat: PropTypes.string.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    children: PropTypes.node.isRequired,
    affordableUpgradeCount: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.bottomNavOnChange = this.bottomNavOnChange.bind(this);
  }

  bottomNavOnChange(event, pageKey) {
    const {
      history,
    } = this.props;

    switch (pageKey) {
      case 'clicker':
        history.push('/');
        break;
      case 'upgrades':
        history.push('/upgrades');
        break;
      case 'wallet':
        history.push('/wallet');
        break;
      default:
        throw new Error(`Unrecognized navigation: ${pageKey}`);
    }
  }

  render() {
    const {
      coinCount,
      numberFormat,
      match,
      children,
      affordableUpgradeCount,
    } = this.props;

    const {
      url,
    } = match;

    let selectedBottomNavValue;
    if (url.includes('upgrades')) {
      selectedBottomNavValue = 'upgrades';
    } else if (url.includes('wallet')) {
      selectedBottomNavValue = 'wallet';
    } else {
      selectedBottomNavValue = 'clicker';
    }

    return (
      <div>
        <CoinTicker />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Mining Mogul
            </Typography>
            <div
              style={{
                marginLeft: 'auto', // pull to the right side
              }}
            >
              <CoinCount coinCount={coinCount} numberFormat={numberFormat} />
            </div>
          </Toolbar>
        </AppBar>
        {children}
        {/* Add an element that's the same size as the bottom nav so that content won't get blocked */}
        <div style={{ width: '100%', height: bottomNavHeight }} />
        <BottomNavigation
          value={selectedBottomNavValue}
          onChange={this.bottomNavOnChange}
          style={{
            width: '100vw',
            position: 'fixed',
            bottom: 0,
          }}
        >
          <BottomNavigationAction
            label="Clicker"
            value="clicker"
            icon={
              <ClickIcon />
            }
          />
          <BottomNavigationAction
            label="Upgrades"
            value="upgrades"
            icon={affordableUpgradeCount > 0 ? <Badge badgeContent={affordableUpgradeCount} color="primary"><BuildIcon /></Badge> : <BuildIcon />}
          />
          <BottomNavigationAction label="Wallet" value="wallet" icon={<WalletIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    affordableUpgradeCount: affordableUpgradeCountSelector(state),
    coinCount: state.coinCount,
    numberFormat: numberFormatSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, null)(AppShell));
