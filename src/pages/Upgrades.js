import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MysteryIcon from '@material-ui/icons/HelpOutline';
import Bitcoin from 'components/Logos/Bitcoin';

import { colors } from 'settings/theme';
import {
  purchaseUpgrade as purchaseUpgradeAC,
} from 'redux/thunkActionCreators';

import {
  numberFormatSelector,
} from 'redux/selectors';

import AppShell from 'components/AppShell';
import Number from 'components/Number';

function HiddenUpgrade(props) {
  const {
    coinCount,
    availableUpgrade,
    upgradeCost,
    numberFormat,
    onClick,
  } = props;

  return (
    <ListItem>
      <Avatar>
        <MysteryIcon />
      </Avatar>
      <ListItemText
        primary={(
          <span
            style={{
              display: 'inline-block',
              height: 10,
              width: 100,
              backgroundColor: colors.textSecondary,
            }}
          />
        )}
        secondary={(
          <span
            style={{
              display: 'inline-block',
              height: 10,
              width: 150,
              backgroundColor: colors.textSecondary,
            }}
          />
        )}
      />
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          color="primary"
          disabled={coinCount < upgradeCost}
          onClick={() => onClick(availableUpgrade.id)}
        >
          <span>
            Buy for
            <Bitcoin
              height={15}
              width={15}
            />
          </span>
          <Number
            value={upgradeCost}
            // if number format is fraction upgrade to integer, otherwise use the provided number format
            format={numberFormat === 'f' ? 'i' : numberFormat}
          />
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

HiddenUpgrade.propTypes = {
  coinCount: PropTypes.number.isRequired,
  upgradeCost: PropTypes.number.isRequired,
  numberFormat: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  availableUpgrade: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    iconSrc: PropTypes.string,
    getCoinsPerClickModifier: PropTypes.func,
    getCoinsPerSecondModifier: PropTypes.func,
    getCost: PropTypes.func,
  }).isRequired,
};

function Upgrade(props) {
  const {
    coinCount,
    availableUpgrade,
    upgradeCost,
    numberFormat,
    onClick,
  } = props;

  return (
    <ListItem>
      <Avatar>
        <img
          src={availableUpgrade.iconSrc}
          alt={availableUpgrade.name}
          style={{
            width: 40,
            height: 'auto',
          }}
        />
      </Avatar>
      <ListItemText primary={availableUpgrade.name} secondary={availableUpgrade.description} />
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          color="primary"
          disabled={coinCount < upgradeCost}
          onClick={() => onClick(availableUpgrade.id)}
        >
          <span>
            Buy for
            <Bitcoin
              height={15}
              width={15}
            />
          </span>
          <Number
            value={upgradeCost}
            // if number format is fraction upgrade to integer, otherwise use the provided number format
            format={numberFormat === 'f' ? 'i' : numberFormat}
          />
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

Upgrade.propTypes = {
  coinCount: PropTypes.number.isRequired,
  upgradeCost: PropTypes.number.isRequired,
  numberFormat: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  availableUpgrade: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    iconSrc: PropTypes.string,
    getCoinsPerClickModifier: PropTypes.func,
    getCoinsPerSecondModifier: PropTypes.func,
    getCost: PropTypes.func,
  }).isRequired,
};

class Upgrades extends React.Component {
  static propTypes = {
    coinCount: PropTypes.number.isRequired,
    numberFormat: PropTypes.string.isRequired,
    purchaseUpgrade: PropTypes.func.isRequired,
    ownedUpgrades: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      level: PropTypes.number,
    })).isRequired,
    availableUpgrades: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      iconSrc: PropTypes.string,
      getCoinsPerClickModifier: PropTypes.func,
      getCoinsPerSecondModifier: PropTypes.func,
      getCost: PropTypes.func,
    })).isRequired,
  }

  constructor(props) {
    super(props);

    this.onUpgradeClick = this.onUpgradeClick.bind(this);
  }

  onUpgradeClick(upgradeId) {
    const {
      purchaseUpgrade,
    } = this.props;

    purchaseUpgrade(upgradeId);
  }

  render() {
    const {
      coinCount,
      availableUpgrades,
      ownedUpgrades,
      numberFormat,
    } = this.props;

    return (
      <AppShell>
        <Container>
          <Row>
            <Col>
              <List>
                {availableUpgrades.map((availableUpgrade, index) => {
                  const currentUpgrade = ownedUpgrades.find(ownedUpgrade => ownedUpgrade.id === availableUpgrade.id);
                  const upgradeCost = availableUpgrade.getCost(currentUpgrade.level + 1);

                  // if upgrade is already purchased or it's the first one in the list, we reveal it
                  if (currentUpgrade.level > 0 || index === 0) {
                    return (
                      <Upgrade
                        key={`upgrade-${availableUpgrade.id}`}
                        availableUpgrade={availableUpgrade}
                        upgradeCost={upgradeCost}
                        numberFormat={numberFormat}
                        coinCount={coinCount}
                        onClick={this.onUpgradeClick}
                      />
                    );
                  }

                  return (
                    <HiddenUpgrade
                      key={`upgrade-${availableUpgrade.id}`}
                      availableUpgrade={availableUpgrade}
                      upgradeCost={upgradeCost}
                      numberFormat={numberFormat}
                      coinCount={coinCount}
                      onClick={this.onUpgradeClick}
                    />
                  );
                })}
              </List>
            </Col>
          </Row>
        </Container>
      </AppShell>
    );
  }
}

function mapStateToProps(state) {
  return {
    coinCount: state.coinCount,
    ownedUpgrades: state.ownedUpgrades,
    availableUpgrades: state.availableUpgrades,
    numberFormat: numberFormatSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    purchaseUpgrade: upgrade => dispatch(purchaseUpgradeAC(upgrade)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upgrades);
