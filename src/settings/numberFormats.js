export const numberFormats = {
  f: { // fraction
    minValue: 0,
    format: number => number.toFixed(2),
  },
  i: { // integer
    minValue: 10,
    format: number => number.toFixed(0),
  },
  k: { // thousands
    minValue: 10 ** 3,
    format: number => `${(number / (10 ** 3)).toFixed(0)}k`,
  },
  m: { // millions
    minValue: 10 ** 6,
    format: number => `${(number / (10 ** 6)).toFixed(0)}m`,
  },
  b: { // billions
    minValue: 10 ** 9,
    format: number => `${(number / (10 ** 9)).toFixed(0)}b`,
  },
  t: { // trillions
    minValue: 10 ** 12,
    format: number => `${(number / (10 ** 12)).toFixed(0)}t`,
  },
};
