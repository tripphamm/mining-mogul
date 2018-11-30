import * as ActionTypes from 'redux/actionTypes';

export function incrementCoinCount(amount) {
  return {
    type: ActionTypes.INCREMENT_COIN_COUNT,
    amount,
  };
}

export function decrementCoinCount(amount) {
  return {
    type: ActionTypes.DECREMENT_COIN_COUNT,
    amount,
  };
}

export function addUpgrade(ownedUpgrade) {
  return {
    type: ActionTypes.ADD_UPGRADE,
    ownedUpgrade,
  };
}
