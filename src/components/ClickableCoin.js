import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Bitcoin from 'components/Logos/Bitcoin';

function ClickableCoin(props) {
  const {
    onClick,
  } = props;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={onClick}
        style={{
          borderRadius: '50%',
          padding: 0,
        }}
      >
        <Bitcoin />
      </Button>
    </div>
  );
}

ClickableCoin.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ClickableCoin;
