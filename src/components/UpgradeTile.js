import React from 'react';
import PropTypes from 'prop-types';

function UpgradeTile(props) {
  const {
    upgrade,
    currentLevel,
    onClick,
    coinCount,
  } = props;

  const cost = upgrade.getCost(currentLevel + 1);
  const disabled = cost > coinCount;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        touchAction: 'manipulation', // disable double-tap to zoom, but retain panning and pinch zoom
        width: '100%',
        height: 100,
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
          gridTemplateAreas: `
            "img img img img ... ... ... ... ... ... lvl lvl"
            "img img img img ... nam nam nam nam nam ... ..."
            "img img img img ... cst cst cst cst cst ... avl"
            "img img img img ... dsc dsc dsc dsc dsc ... ..."
            "img img img img ... ... ... ... ... ... ... ..."
          `,
        }}
      >
        <div
          style={{
            backgroundImage: `url("${upgrade.iconSrc}")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            gridArea: 'img',
          }}
        />
        <div
          style={{
            gridArea: 'nam',
          }}
        >
          {upgrade.name}
        </div>
        <div
          style={{
            gridArea: 'cst',
          }}
        >
          {`Cost: ${cost}`}
        </div>
        <div
          style={{
            gridArea: 'dsc',
          }}
        >
          {upgrade.description}
        </div>
        <div
          style={{
            gridArea: 'lvl',
          }}
        >
          {`Lvl: ${currentLevel}`}
        </div>
        <div
          style={{
            gridArea: 'avl',
            backgroundColor: disabled ? 'red' : 'lightgreen',
            borderRadius: '50%',
            height: 10,
            width: 10,
          }}
        />
      </div>
    </button>
  );
}

UpgradeTile.propTypes = {
  upgrade: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    iconSrc: PropTypes.string,
    getCoinsPerClickModifier: PropTypes.func,
    getCoinsPerSecondModifier: PropTypes.func,
    getCost: PropTypes.func,
  }).isRequired,
  currentLevel: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  coinCount: PropTypes.number.isRequired,
};

export default UpgradeTile;
