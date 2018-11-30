function getCost(baseAmount, baseIncrease, level) {
  return Math.ceil(baseAmount * (baseIncrease ** (level - 1)));
}

export const availableUpgrades = [
  {
    id: 'cpu',
    name: 'CPU',
    description: 'Basic CPU for generating coins',
    iconSrc: 'https://static.thenounproject.com/png/72043-200.png',
    getCoinsPerSecondModifier: level => level * 0.1,
    getCoinsPerClickModifier: () => 0,
    getCost: level => getCost(15, 1.15, level),
  },
  {
    id: 'gpu',
    name: 'GPU',
    description: 'Optimized For More Coins',
    iconSrc: 'https://static.thenounproject.com/png/1132938-200.png',
    getCoinsPerSecondModifier: level => level * 1,
    getCoinsPerClickModifier: () => 0,
    getCost: level => getCost(100, 1.15, level),
  },
  {
    id: 'asic',
    name: 'ASIC',
    description: 'Purpose built miner for your Coins',
    iconSrc: 'https://static.thenounproject.com/png/1132938-200.png',
    getCoinsPerSecondModifier: level => level * 8,
    getCoinsPerClickModifier: () => 0,
    getCost: level => getCost(1100, 1.15, level),
  },
  {
    id: 'cray',
    name: 'Cray Super Computer',
    description: 'Xtreme Coins',
    iconSrc: 'https://cdn4.iconfinder.com/data/icons/networking-solid-icons-vol-1/72/44-512.png',
    getCoinsPerSecondModifier: level => level * 47,
    getCoinsPerClickModifier: () => 0,
    getCost: level => getCost(12000, 1.15, level),
  },
  {
    id: 'datacenter',
    name: 'Data Center',
    description: 'Get all the Coins',
    iconSrc: 'http://www.avantsinc.com/images/avantsinc-data-center-management.jpg',
    getCoinsPerSecondModifier: level => level * 260,
    getCoinsPerClickModifier: () => 0,
    getCost: level => getCost(130000, 1.15, level),
  },
  {
    id: 'thecloud',
    name: 'The Cloud',
    description: 'Gotta mine em\' all',
    iconSrc: 'https://cms-assets.tutsplus.com/uploads/users/16/posts/30551/final_image/cloud850.png',
    getCoinsPerSecondModifier: level => level * 1400,
    getCoinsPerClickModifier: () => 0,
    getCost: level => getCost(1400000, 1.15, level),
  },
];
