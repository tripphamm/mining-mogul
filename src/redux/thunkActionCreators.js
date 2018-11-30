import * as ActionCreators from 'redux/actionCreators';

export function purchaseUpgrade(upgradeId) {
  return async (dispatch, getState) => {
    const stateSnapshot = getState();

    const wallet = stateSnapshot.coinCount;
    const desiredUpgrade = stateSnapshot.availableUpgrades.find(availableUpgrade => availableUpgrade.id === upgradeId);

    let currentLevel = 0;
    const ownedUpgrade = stateSnapshot.ownedUpgrades.find(ou => ou.id === upgradeId);
    if (ownedUpgrade !== undefined) {
      currentLevel = ownedUpgrade.level;
    }

    const cost = desiredUpgrade.getCost(currentLevel + 1);

    if (cost > wallet) {
      return; // todo: dispatch "can't afford message"
    }

    dispatch(ActionCreators.decrementCoinCount(cost));

    dispatch(ActionCreators.addUpgrade({
      id: upgradeId,
      level: currentLevel + 1,
    }));
  };
}
