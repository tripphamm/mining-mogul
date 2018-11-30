import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';

import { numberFormats } from 'settings/numberFormats';

const validNumberFormatKeys = Object.keys(numberFormats);

const orderedNumberFormatKeys = orderBy(
  validNumberFormatKeys,
  numberFormatKey => numberFormats[numberFormatKey].minValue,
  'asc',
);

const mostSignificantNumberFormatKey = orderedNumberFormatKeys[orderedNumberFormatKeys.length - 1];

function getFallbackNumberFormat(numberFormatKey) {
  const indexOfCurrentNumberFormat = orderedNumberFormatKeys.indexOf(numberFormatKey);

  if (indexOfCurrentNumberFormat === -1 || indexOfCurrentNumberFormat === 0) {
    throw new Error(`Could not find fallback format for ${numberFormatKey}`);
  }

  return orderedNumberFormatKeys[indexOfCurrentNumberFormat - 1];
}

function formatNumber(number, numberFormatKey) {
  const {
    minValue,
    format,
  } = numberFormats[numberFormatKey];

  if (Math.abs(number) >= minValue) {
    return format(number);
  }

  return formatNumber(number, getFallbackNumberFormat(numberFormatKey));
}

function Number(props) {
  const {
    value,
    format = 'auto',
    ...restProps
  } = props;

  return (
    <span
      title={value.toFixed(2)}
      {...restProps}
    >
      {formatNumber(value, format === 'auto' ? mostSignificantNumberFormatKey : format)}
    </span>
  );
}

Number.propTypes = {
  value: PropTypes.number.isRequired,
  format: PropTypes.oneOf(['auto', ...validNumberFormatKeys]),
};

Number.defaultProps = {
  format: 'auto',
};

export default Number;
