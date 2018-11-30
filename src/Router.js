import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import ScreenSizeUtil from 'utils/ScreenSizeUtil';
import withScreenClass, { withScreenClassPropTypes } from 'components/hocs/withScreenClass';
import AllInOne from 'pages/AllInOne';
import CoinClicker from 'pages/CoinClicker';
import Upgrades from 'pages/Upgrades';
import Wallet from 'pages/Wallet';

function RouterSwitch(props) {
  const {
    isLargeScreen,
  } = props;

  if (isLargeScreen) {
    return (
      <Switch>
        <Route path="*" component={AllInOne} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={CoinClicker} />
      <Route path="/upgrades" component={Upgrades} />
      <Route path="/wallet" component={Wallet} />
    </Switch>
  );
}

RouterSwitch.propTypes = {
  isLargeScreen: PropTypes.bool.isRequired,
};

@withScreenClass()
class Router extends React.Component {
  static propTypes = {
    ...withScreenClassPropTypes,
  }

  render() {
    const {
      screenClass,
    } = this.props;

    const isLargeScreen = ScreenSizeUtil.isLargeScreen(screenClass);

    return (
      <BrowserRouter>
        <RouterSwitch isLargeScreen={isLargeScreen} />
      </BrowserRouter>
    );
  }
}

export default Router;
