import React from 'react';
import PropTypes from 'prop-types';

function Bitcoin(props) {
  const {
    width,
    height,
  } = props;
  return (
    <img
      style={{
        height,
        width,
      }}
      src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png"
      alt="₿"
    />
  );
}

Bitcoin.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

Bitcoin.defaultProps = {
  height: 100,
  width: 100,
};

export default Bitcoin;
