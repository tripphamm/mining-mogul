import * as ActionTypes from 'redux/actionTypes';
import { availableUpgrades } from 'settings/upgrades';

const initialState = {
  coinCount: 0,
  ticksPerSecond: 10,
  availableUpgrades,
  ownedUpgrades: availableUpgrades.map(availableUpgrade => ({
    id: availableUpgrade.id,
    level: 0,
  })),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT_COIN_COUNT:
      return {
        ...state,
        coinCount: state.coinCount + action.amount,
      };
    case ActionTypes.DECREMENT_COIN_COUNT:
      return {
        ...state,
        coinCount: state.coinCount - action.amount,
      };
    case ActionTypes.ADD_UPGRADE:
      return {
        ...state,
        ownedUpgrades: [
          ...state.ownedUpgrades.filter(upgrade => upgrade.id !== action.ownedUpgrade.id), // remove upgrade with the same id
          action.ownedUpgrade, // add new upgrade
        ],
      };
    default:
      return state;
  }
};
