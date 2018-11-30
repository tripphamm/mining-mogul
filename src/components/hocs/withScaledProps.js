import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import ScreenSizeUtil from 'utils/ScreenSizeUtil';

export default function withScaledProps(scalableProps) {
  return (Component) => {
    class WithScaledProps extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          screenWidth: 0,
        };

        this.setScreenWidth = this.setScreenWidth.bind(this);
      }

      componentDidMount() {
        this.setScreenWidth();

        this.eventListener = throttle(this.setScreenWidth, 100);
        window.addEventListener('resize', this.eventListener);
      }

      componentWillUnmount() {
        this.eventListener.cancel();
        window.removeEventListener('resize', this.eventListener);
      }

      setScreenWidth() {
        this.setState({ screenWidth: ScreenSizeUtil.getViewPortWidth() });
      }

      render() {
        const {
          screenWidth,
        } = this.state;

        const scaledProps = Object.keys(scalableProps).reduce((aggregator, scalablePropName) => {
          const scalableProp = scalableProps[scalablePropName];

          const {
            minValue,
            maxValue,
            minWidth = 400,
            maxWidth = 1200,
          } = scalableProp;

          let value;
          if (screenWidth === null) {
            value = minValue;
          } else if (screenWidth <= minWidth) {
            value = minValue;
          } else if (screenWidth >= maxWidth) {
            value = maxValue;
          } else { // screen width is between min and max
            const valueRange = maxValue - minValue;
            const widthRange = maxWidth - minWidth;
            const widthPercentage = (screenWidth - minWidth) / widthRange;

            value = minValue + (valueRange * widthPercentage);
          }

          return {
            ...aggregator,
            [scalablePropName]: value,
          };
        }, {});

        return (
          <Component scaledProps={scaledProps} {...this.props} />
        );
      }
    }

    WithScaledProps.displayName = `WithScaledProps(${Component.displayName || Component.name || 'Component'})`;

    return WithScaledProps;
  };
}

export const withScaledPropsPropTypes = {
  scaledProps: PropTypes.objectOf(PropTypes.number),
};
