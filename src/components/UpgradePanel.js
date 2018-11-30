import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  purchaseUpgrade as purchaseUpgradeAC,
} from 'redux/thunkActionCreators';

import UpgradeTile from 'components/UpgradeTile';

class UpgradePanel extends Component {
  static propTypes = {
    coinCount: PropTypes.number.isRequired,
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
    } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        {availableUpgrades.map((availableUpgrade) => {
          const currentUpgrade = ownedUpgrades.find(upgrade => upgrade.id === availableUpgrade.id);

          let currentLevel = 0;
          if (currentUpgrade) {
            currentLevel = currentUpgrade.level;
          }

          return (
            <UpgradeTile
              key={`upgrade-tile-${availableUpgrade.id}`}
              coinCount={coinCount}
              upgrade={availableUpgrade}
              currentLevel={currentLevel}
              onClick={() => this.onUpgradeClick(availableUpgrade.id)}
            />
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coinCount: state.coinCount,
    ownedUpgrades: state.ownedUpgrades,
    availableUpgrades: state.availableUpgrades,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    purchaseUpgrade: upgrade => dispatch(purchaseUpgradeAC(upgrade)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpgradePanel);
