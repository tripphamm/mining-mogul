import { createSelector } from 'reselect';

const selectCoinCount = state => state.coinCount;
const selectAvailableUpgrades = state => state.availableUpgrades;
const selectOwnedUpgrades = state => state.ownedUpgrades;

const selectCurrentUpgrades = createSelector(
  [selectOwnedUpgrades, selectAvailableUpgrades],
  (ownedUpgrades, availableUpgrades) => (
    ownedUpgrades.map((ownedUpgrade) => {
      const upgrade = availableUpgrades.find(availableUpgrade => availableUpgrade.id === ownedUpgrade.id);

      return {
        id: upgrade.id,
        coinsPerClickModifier: upgrade.getCoinsPerClickModifier(ownedUpgrade.level),
        coinsPerSecondModifier: upgrade.getCoinsPerSecondModifier(ownedUpgrade.level),
        cost: upgrade.getCost(ownedUpgrade.level),
      };
    })
  ),
);

const selectNextUpgrades = createSelector(
  [selectOwnedUpgrades, selectAvailableUpgrades],
  (ownedUpgrades, availableUpgrades) => (
    ownedUpgrades.map((ownedUpgrade) => {
      const upgrade = availableUpgrades.find(availableUpgrade => availableUpgrade.id === ownedUpgrade.id);

      return {
        id: upgrade.id,
        coinsPerClickModifier: upgrade.getCoinsPerClickModifier(ownedUpgrade.level + 1),
        coinsPerSecondModifier: upgrade.getCoinsPerSecondModifier(ownedUpgrade.level + 1),
        cost: upgrade.getCost(ownedUpgrade.level + 1),
      };
    })
  ),
);

export const coinsPerClickSelector = createSelector(
  selectCurrentUpgrades,
  upgrades => upgrades.reduce((coinsPerClick, upgrade) => coinsPerClick + upgrade.coinsPerClickModifier, 1),
);

export const coinsPerSecondSelector = createSelector(
  selectCurrentUpgrades,
  upgrades => upgrades.reduce((coinsPerSecond, upgrade) => coinsPerSecond + upgrade.coinsPerSecondModifier, 0),
);

export const affordableUpgradeCountSelector = createSelector(
  [selectCoinCount, selectNextUpgrades],
  (coinCount, upgrades) => upgrades.reduce((affordableUpgradeCount, upgrade) => {
    if (coinCount >= upgrade.cost) {
      return affordableUpgradeCount + 1;
    }

    return affordableUpgradeCount;
  }, 0),
);

export const numberFormatSelector = createSelector(
  coinsPerSecondSelector,
  (coinsPerSecond) => {
    // determine the leftmost digit that is ticking "fast"
    // presently, "fast" means "increases by 5 or more per second"
    const numDigits = coinsPerSecond.toFixed(0).toString().length;
    const mostSignificantDigit = coinsPerSecond.toString()[0];
    const mostSignificantFastTickingDigit = mostSignificantDigit >= 5
      ? numDigits
      : numDigits - 1;

    if (mostSignificantFastTickingDigit < 1) { return 'f'; }
    if (mostSignificantFastTickingDigit < 4) { return 'i'; }
    if (mostSignificantFastTickingDigit < 7) { return 'k'; }
    if (mostSignificantFastTickingDigit < 10) { return 'm'; }
    if (mostSignificantFastTickingDigit < 13) { return 'b'; }

    return 't';
  },
);
