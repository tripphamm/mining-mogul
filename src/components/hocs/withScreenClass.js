import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import ScreenSizeUtil from 'utils/ScreenSizeUtil';

export default function withScreenClass() {
  return (Component) => {
    class WithScreenClass extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          screenClass: 'xl',
        };

        this.setScreenClass = this.setScreenClass.bind(this);
      }

      componentDidMount() {
        this.setScreenClass();
        this.eventListener = throttle(this.setScreenClass, 100);
        window.addEventListener('resize', this.eventListener);
      }

      componentWillUnmount() {
        this.eventListener.cancel();
        window.removeEventListener('resize', this.eventListener);
      }

      setScreenClass() {
        this.setState({ screenClass: ScreenSizeUtil.getScreenClass() });
      }

      render() {
        const {
          screenClass,
        } = this.state;

        return (
          <Component screenClass={screenClass} {...this.props} />
        );
      }
    }

    WithScreenClass.displayName = `WithScreenClass(${Component.displayName || Component.name || 'Component'})`;

    return WithScreenClass;
  };
}

export const withScreenClassPropTypes = {
  screenClass: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
